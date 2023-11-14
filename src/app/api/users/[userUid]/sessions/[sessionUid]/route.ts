import withCurrentUser from "@/app/api/_middlewares/withCurrentUser";
import { Session } from "@/app/api/_models/session";
import {
  BadRequest,
  InternalServerError,
  NotFound,
  NotFoundMessages,
  Unauthorized,
} from "@/app/api/responses";
import { getSession } from "@/lib/firebase-admin";
import { googleCalendar } from "@/lib/googlecal";
import { statics } from "@/static";
import { add } from "date-fns";
import { firestore } from "firebase-admin";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";

interface GETParams {
  userUid: string;
  sessionUid: string;
}

export async function GET(req: NextRequest, { params }: { params: GETParams }) {
  return withCurrentUser(req, async (currUser) => {
    const doc = await firestore()
      .collection("sessions")
      .doc(params.sessionUid)
      .get();

    if (!doc.exists) {
      return NotFound(
        NotFoundMessages.entityNotFound("Session", params.sessionUid),
      );
    }

    const data = doc.data() as Session;

    if (data.user.id != currUser.uid) {
      return Unauthorized();
    }

    const session = {
      uid: doc.id,
      ...data,
    };

    return NextResponse.json(session);
  });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: GETParams },
) {
  return withCurrentUser(req, async (currUser) => {
    try {
      const { start_date }: { start_date: string } = await req.json();

      if (!start_date) {
        return BadRequest("body", "start_date");
      }

      const doc = await getSession(params.sessionUid);

      if (!doc.exists) {
        return NotFound(
          NotFoundMessages.entityNotFound("Session", params.sessionUid),
        );
      }

      const data = doc.data() as Session;
      if (data.user.id !== currUser.uid) {
        return Unauthorized();
      }

      await doc.ref.update({
        start_date: start_date,
      } as Partial<Session>);

      console.log(`Updated session time for ${doc.id} to ${start_date}`);

      const getEventResp = await googleCalendar.events.get({
        calendarId: statics.bookingCalendarId,
        eventId: data.event_id,
      });

      if (getEventResp.status !== StatusCodes.OK) {
        throw `Could not load calendar event with ID=${data.event_id} for session with ID=${doc.id}`;
      }

      const endDate = add(new Date(start_date), {
        minutes: data.duration_minutes,
      }).toISOString();

      const updateEventResp = await googleCalendar.events.update({
        calendarId: statics.bookingCalendarId,
        eventId: data.event_id,

        requestBody: {
          ...getEventResp.data,
          start: {
            dateTime: start_date,
            timeZone: data.timezone,
          },
          end: {
            dateTime: endDate,
            timeZone: data.timezone,
          },
        },
      });

      if (updateEventResp.status !== StatusCodes.OK) {
        throw `Could not update calendar event with ID=${data.event_id} for session with ID=${doc.id}`;
      }

      console.log(
        `Successfully updated Google Calendar event (ID=${data.event_id}) for session ID=${params.sessionUid}`,
      );

      return new NextResponse(null, { status: StatusCodes.OK });
    } catch (error: any) {
      const errorMsg = error?.message ?? error;
      console.error(`Failed to reschedule session: ${errorMsg}`);
      return InternalServerError(
        "Error occurred rescheduling session",
        errorMsg,
      );
    }
  });
}
