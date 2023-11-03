import { generateAuthUrl } from "@/lib/googlecal";
import { NextResponse } from "next/server";

export function GET(request: Request) {
  // const body = {
  //     url: generateAuthUrl()
  // };

  return NextResponse.redirect(generateAuthUrl());
}
