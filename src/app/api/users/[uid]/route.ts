import { NextRequest, NextResponse } from "next/server";

import { getDbUser } from "@/lib/firebase-admin";
import { StatusCodes } from "http-status-codes";

export interface DBUser {
  available_sessions: number;
}

interface GETParams {
  uid: string;
}

export async function GET(req: NextRequest, { params }: { params: GETParams }): Promise<Response> {
  const data = await getDbUser(params.uid);

  console.log("DOES THIS WORK?");

  if (!data) {
    return Response.json(
      {
        error: `User with uid ${params.uid} could not be found`,
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
