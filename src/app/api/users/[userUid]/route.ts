import { NextRequest, NextResponse } from "next/server";

import { getDbUser } from "@/lib/firebase-admin";
import { StatusCodes } from "http-status-codes";

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
    return Response.json(
      {
        error: `User with uid ${params.userUid} could not be found`,
      },
      {
        status: StatusCodes.NOT_FOUND,
      },
    );
  }

  return NextResponse.json(data, {
    status: StatusCodes.OK,
  });
}
