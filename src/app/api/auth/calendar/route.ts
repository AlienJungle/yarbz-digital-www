import { generateAuthUrl } from "@/lib/googlecal";
import { NextResponse } from "next/server";

export function GET(request: Request) {
  return NextResponse.redirect(generateAuthUrl());
}
