import { cache, googleCalendar } from "@/lib/googlecal";
import { add } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

interface GETParams {
  date: string;
}

export async function GET(_req: NextRequest, { params }: { params: GETParams }): Promise<NextResponse> {
  const calendarIds: string[] = (await cache.calendarlist.get())?.map((cal) => cal.id!) ?? [];

  const fromDateUTC = new Date(params.date);

  const fromDateMidnightUTC = new Date(Date.UTC(fromDateUTC.getUTCFullYear(), fromDateUTC.getUTCMonth(), fromDateUTC.getUTCDate()));
  const toDateMidnightUTC = add(fromDateMidnightUTC, { days: 1 });

  const freebusy = (
    await googleCalendar.freebusy.query({
      requestBody: {
        timeMin: fromDateMidnightUTC.toISOString(),
        timeMax: toDateMidnightUTC.toISOString(),
        items: calendarIds.map((calId) => ({ id: calId })),
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
