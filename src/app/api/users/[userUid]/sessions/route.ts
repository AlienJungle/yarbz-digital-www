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
  uid: string;
}

export async function POST(
  req: NextRequest,
  { params }: { params: POSTParams },
): Promise<NextResponse> {
  return withCurrentUser(req, async (currUser) => {
    const reqBody: Session = await req.json();

    const session: Session = {
      user: db.doc("/users/" + params.uid),
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

      await updateSession(docSnapshot.id, {
        meeting_link: calResult.data.hangoutLink ?? undefined,
      });

      console.log("Updated meeting link for session " + docSnapshot.id);
    } else {
      console.error(
        "Error creating calendar event for session " + docSnapshot.id,
        "Status=",
        calResult.status,
        "Data=",
        calResult.data,
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
    if (!currentUser.is_admin && currentUser.uid !== params.uid) {
      return new NextResponse("UNAUTHORIZED", {
        status: StatusCodes.UNAUTHORIZED,
      });
    }

    const sessionsSnapshot = await getUserSessions(params.uid);

    const sessions = sessionsSnapshot.map((ss) => ({
      uid: ss.id,
      ...ss.data(),
    }));

    return NextResponse.json(sessions);
  });
}
