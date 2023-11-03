import { saveCredentials } from "@/lib/googlecal";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const scope = searchParams.get("scope");
  const code = searchParams.get("code");

  if (!scope) {
    return NextResponse.json(
      {
        error: "Scope was missing.",
      },
      {
        status: 400,
      },
    );
  }

  if (!code) {
    return NextResponse.json(
      {
        error: "Code was missing.",
      },
      {
        status: 400,
      },
    );
  }

  await saveCredentials(code);

  return NextResponse.json(
    {
      success: true,
      message: "Token saved successfully!",
    },
    {
      status: 200,
    },
  );
}
