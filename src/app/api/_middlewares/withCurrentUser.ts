import { auth, getDbUser } from "@/lib/firebase-admin";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";
import { DecodedIdTokenUser, User } from "../_models/user";

export default async function withCurrentUser(req: NextRequest, callback: (decodedIdTokenUser: DecodedIdTokenUser) => Promise<NextResponse>): Promise<NextResponse> {
  try {
    const sessionCookie = req.cookies.get(process.env.SESSION_COOKIE_NAME)?.value ?? "";
    const claims = await auth.verifySessionCookie(sessionCookie, true);

    const currDbUser = await getDbUser(claims.uid);
    if (!currDbUser) {
      throw "Could not find user record";
    }

    const decodedIdTokenUser: DecodedIdTokenUser = {
      ...claims,
      ...(currDbUser as User),
    };

    return await callback(decodedIdTokenUser);
  } catch (error) {
    return new NextResponse("UNAUTHORIZED", {
      status: StatusCodes.UNAUTHORIZED,
    });
  }
}
