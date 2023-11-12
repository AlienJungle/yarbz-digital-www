import { auth, createDbUser, getDbUser } from "@/lib/firebase-admin";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<Response> {
  const { idToken } = await req.json();

  // 5 days
  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  // Create the cookie
  const cookie: string = await auth.createSessionCookie(idToken as string, {
    expiresIn,
  });

  // Set the cookie (ensuring httpOnly to stop JS access,
  // and sameSite to stop CSRF attack)
  cookies().set(process.env.SESSION_COOKIE_NAME, cookie, {
    maxAge: expiresIn,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  const sessionCookie =
    cookies().get(process.env.SESSION_COOKIE_NAME)?.value ?? "";
  const claims = await auth.verifySessionCookie(sessionCookie, true);

  if (!(await getDbUser(claims.uid))) {
    createDbUser(claims.uid, {
      is_admin: false,
      available_sessions: 0,
    });

    console.log("Successfully created new user record for " + claims.uid);
  }

  return NextResponse.json({ success: true });
}
