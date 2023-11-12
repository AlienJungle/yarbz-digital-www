import { cache, googleCalendar } from "@/lib/googlecal";
import { add, set } from "date-fns";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const searchParams = req.nextUrl.searchParams;
  const date = searchParams.get("date");
  const timezone = searchParams.get("timezone");

  if (!date || !timezone) {
    return NextResponse.json(
      {
        error: "date and timezone params required.",
      },
      {
        status: StatusCodes.BAD_REQUEST,
      },
    );
  }

  const calendarIds: string[] =
    (await cache.calendarlist.get())?.map((cal) => cal.id!) ?? [];

  const fromDate = set(new Date(date), {
    minutes: 0,
    hours: 0,
    seconds: 0,
    milliseconds: 0,
  }); // Set as midnight

  const toDate = add(fromDate, { days: 1 });

  const freebusy = (
    await googleCalendar.freebusy.query({
      requestBody: {
        timeMin: fromDate.toISOString(),
        timeMax: toDate.toISOString(),
        items: calendarIds.map((calId) => ({ id: calId })),
        timeZone: timezone,
      },
    })
  ).data;

  const bustSlots =
    Object.keys(freebusy.calendars ?? [])
      .map((calId) => {
        return freebusy.calendars![calId].busy;
      })
      .reduce((a, b) => {
        return [...a!, ...b!];
      }) ?? [];

  return NextResponse.json(bustSlots);
}
