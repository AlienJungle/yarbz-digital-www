import { NextRequest, NextResponse } from "next/server";

import { getDbUser } from "@/lib/firebase-admin";
import { StatusCodes } from "http-status-codes";
import { NotFound, NotFoundMessages } from "../../responses";

export interface DBUser {
  available_sessions: number;
}

interface GETParams {
  userUid: string;
}

export async function GET(
  req: NextRequest,
  { params }: { params: GETParams },
): Promise<Response> {
  const data = await getDbUser(params.userUid);

  if (!data) {
    return NotFound(NotFoundMessages.entityNotFound("User", params.userUid));
  }

  return NextResponse.json(data, {
    status: StatusCodes.OK,
  });
}
