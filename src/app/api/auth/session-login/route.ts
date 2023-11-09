import { auth, createDbUser, getDbUser } from "@/lib/firebase-admin";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  console.log("Processing session-login request...");

  const { idToken } = await req.json();

  console.log("Parsed request payload.", { idToken });

  // 5 days
  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  console.log("Creating cookie...");

  // Create the cookie
  const cookie: string = await auth.createSessionCookie(idToken as string, {
    expiresIn,
  });

  console.log("Successfully created session cookie", cookie);

  console.log("Setting cookie in response...");

  // Set the cookie (ensuring httpOnly to stop JS access,
  // and sameSite to stop CSRF attack)
  cookies().set(process.env.SESSION_COOKIE_NAME, cookie, {
    maxAge: expiresIn,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  console.log("Successfully set cookie in response.");

  console.log("Fetching cookie value...");

  const sessionCookie = cookies().get(process.env.SESSION_COOKIE_NAME)?.value ?? "";

  console.log("Verifying cookie...");

  const claims = await auth.verifySessionCookie(sessionCookie, true);

  console.log("Successfully verified cookie and got claims", claims);

  console.log("Checking DB user existence...");

  if (!(await getDbUser(claims.uid))) {
    console.log("Creating DB user...");

    createDbUser(claims.uid, {
      is_admin: false,
      available_sessions: 0,
    });

    console.log("Successfully created new user record for " + claims.uid);
  }

  return NextResponse.json({ success: true });
}
