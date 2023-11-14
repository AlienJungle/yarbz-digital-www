import { InternalServerError, Unauthorized } from "@/app/api/responses";
import {
  createSession,
  db,
  getUserSessions,
  updateSession,
} from "@/lib/firebase-admin";
import { googleCalendar } from "@/lib/googlecal";
import { statics } from "@/static";
import { add } from "date-fns";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";
import withCurrentUser from "../../../_middlewares/withCurrentUser";
import { Session } from "../../../_models/session";

interface POSTParams {
  userUid: string;
}

export async function POST(
  req: NextRequest,
  { params }: { params: POSTParams },
): Promise<NextResponse> {
  return withCurrentUser(req, async (currUser) => {
    const reqBody: Session = await req.json();

    const session: Session = {
      user: db.doc("/users/" + params.userUid),
      duration_minutes: reqBody.duration_minutes,
      message: reqBody.message,
      start_date: reqBody.start_date,
      timezone: reqBody.timezone,
      create_date: new Date().toUTCString(),
    };

    // Create session

    const doc = await createSession(session);
    const docSnapshot = await doc.get();

    console.log(`Created new session "${docSnapshot.id}"`);

    // Create calendar event

    const endDate = add(new Date(session.start_date), {
      minutes: session.duration_minutes,
    });

    try {
      const calResult = await googleCalendar.events.insert({
        calendarId: statics.bookingCalendarId,
        conferenceDataVersion: 1,
        requestBody: {
          summary: `${currUser.name} - Tutoring`,
          description:
            "Get ready for your upcoming tutoring lesson!\n\nStudent notes: " +
            session.message,
          start: {
            dateTime: session.start_date,
            timeZone: session.timezone,
          },
          end: {
            dateTime: endDate.toISOString(),
            timeZone: session.timezone,
          },
          conferenceData: {
            createRequest: {
              conferenceSolutionKey: {
                type: "hangoutsMeet",
              },
              requestId: crypto.randomUUID(),
            },
          },
          attendees: [
            { email: statics.calendarInviteEmail, displayName: currUser.name },
            {
              email: currUser.email,
              displayName: statics.calendarInviteDisplayName,
            },
          ],
          reminders: {
            useDefault: false,
            overrides: [
              { method: "email", minutes: 24 * 60 },
              { method: "email", minutes: 1 * 60 },
              { method: "popup", minutes: 10 },
            ],
          },
        },
      });

      if (calResult.status === StatusCodes.OK) {
        console.log(
          "Successfully created calendar event for session " + docSnapshot.id,
          "Data=",
          calResult,
        );

        if (!calResult.data.hangoutLink) {
          throw new Error("No hangoutLink was returned.");
        }

        if (!calResult.data.iCalUID) {
          throw new Error("No iCalUID was returned.");
        }

        await updateSession(docSnapshot.id, {
          meeting_link: calResult.data.hangoutLink ?? undefined,
          event_id: calResult.data.id ?? undefined,
        });

        console.log("Updated meeting link for session " + docSnapshot.id);
      } else {
        throw new Error(
          `Calendar creation request failed (status=${calResult.status}): ${calResult.data}`,
        );
      }
    } catch (error: any) {
      const errorMsg = error?.message ?? error;

      console.error(
        `Error created calendar event for session ID=${docSnapshot.id}: ${errorMsg}`,
      );

      // Delete the new event if anything goes wrong after creation
      await docSnapshot.ref.delete();

      return InternalServerError(
        "Error creating Google Calender event",
        error?.message ?? error,
      );
    }

    return new NextResponse(null, {
      status: StatusCodes.CREATED,
    });
  });
}

export async function GET(
  req: NextRequest,
  { params }: { params: POSTParams },
): Promise<NextResponse> {
  return withCurrentUser(req, async (currentUser) => {
    if (currentUser.uid !== params.userUid) {
      return Unauthorized();
    }

    const sessionsSnapshot = await getUserSessions(params.userUid);

    const sessions = sessionsSnapshot.map((ss) => ({
      uid: ss.id,
      ...ss.data(),
    }));

    return NextResponse.json(sessions);
  });
}
