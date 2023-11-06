import { NextRequest, NextResponse } from "next/server";
import withCurrentUser from "../../_middlewares/withCurrentUser";

export async function GET(req: NextRequest): Promise<NextResponse> {
  return withCurrentUser(req, async (user) => {
    return NextResponse.json(user);
  });
}
