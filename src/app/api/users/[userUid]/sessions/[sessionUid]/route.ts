import { firestore } from "firebase-admin";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";

interface GETParams {
  userUid: string;
  sessionUid: string;
}
export async function GET(
  req: NextRequest,
  res: NextResponse,
  { params }: { params: GETParams },
) {
  const doc = await firestore()
    .collection("sessions")
    .doc(params.sessionUid)
    .get();
  if (!doc) {
    return NextResponse.json(
      `Session with ID ${params.sessionUid} could not be found.`,
      {
        status: StatusCodes.NOT_FOUND,
      },
    );
  }

  const session = {
    uid: doc.id,
    ...doc.data(),
  };

  return NextResponse.json(session);
}
