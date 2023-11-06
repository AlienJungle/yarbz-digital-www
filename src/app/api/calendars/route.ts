import { cache } from "@/lib/googlecal";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const calendars = await cache.calendarlist.get();

  return NextResponse.json({
    count: calendars?.length ?? 0,
    items: calendars,
  });
}
