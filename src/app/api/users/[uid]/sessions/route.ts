import { createSession, db } from "@/lib/firebase-admin";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";
import withCurrentUser from "../../../_middlewares/withCurrentUser";
import { Session } from "../../../_models/session";

interface POSTParams {
  uid: string;
}

export async function POST(req: NextRequest, { params }: { params: POSTParams }): Promise<NextResponse> {
  return withCurrentUser(req, async () => {
    const reqBody: Session = await req.json();

    const session: Session = {
      user: db.doc("/users/" + params.uid),
      duration_minutes: reqBody.duration_minutes,
      message: reqBody.message,
      start_date: reqBody.start_date,
    };

    const doc = await createSession(session);
    const docData = (await doc.get()).data();

    return new NextResponse(JSON.stringify(docData), {
      status: StatusCodes.CREATED,
    });
  });
}
