import { auth } from "@/lib/firebase-admin";
import { DecodedIdToken } from "firebase-admin/auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  // Get the current cookie
  const sessionCookie: string = cookies().get(process.env.SESSION_COOKIE_NAME)?.value ?? "";

  // Delete the cookie
  cookies().delete(process.env.SESSION_COOKIE_NAME);

  try {
    // Get claims from cookie
    const decodedClaims: DecodedIdToken = await auth.verifySessionCookie(sessionCookie);
    // Revoke the refresh token
    await auth.revokeRefreshTokens(decodedClaims.sub);

    return NextResponse.redirect(process.env.NEXT_PUBLIC_SITE_URL + "/tutoring/login");
  } catch (error) {
    console.error("Error occurred while logging out " + error);
    return NextResponse.redirect(process.env.NEXT_PUBLIC_SITE_URL + "/tutoring/login");
  }
}
