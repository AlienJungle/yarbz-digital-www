import { useServerAuth } from "@/lib/useServerAuth";
import { FirebaseError } from "firebase-admin";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";
import { DecodedIdTokenUser } from "../_models/user";

export default async function withCurrentUser(req: NextRequest, callback: (decodedIdTokenUser: DecodedIdTokenUser) => Promise<NextResponse>): Promise<NextResponse> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { getCurrentUser } = useServerAuth();

  try {
    // TODO: Move getCurrentUser logic to firebase-admin.ts
    const decodedIdTokenUser: DecodedIdTokenUser | null = await getCurrentUser();
    if (!decodedIdTokenUser) {
      return new NextResponse("UNAUTHORIZED", {
        status: StatusCodes.UNAUTHORIZED,
      });
    }
    return await callback(decodedIdTokenUser);
  } catch (error) {
    const firebaseError = error as FirebaseError;
    switch (firebaseError.code) {
      case "auth/argument-error":
        return new NextResponse("UNAUTHORIZED", {
          status: StatusCodes.UNAUTHORIZED,
        });
      default:
        throw error;
    }
  }
}
