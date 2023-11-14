import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export function InternalServerError(baseMessage: string, error: string) {
  return NextResponse.json(
    {
      message: `${baseMessage}: ${error}`,
    },
    {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    },
  );
}

export function BadRequest(part: "body" | "query", ...requiredArgs: string[]) {
  return NextResponse.json(
    {
      message: `Arguments missing in ${part}. Required arguments: ${requiredArgs.join(
        ",",
      )}`,
    },
    {
      status: StatusCodes.BAD_REQUEST,
    },
  );
}

export function Unauthorized(message?: string) {
  return NextResponse.json(
    { message: message ?? "UNAUTHORIZED" },
    {
      status: StatusCodes.UNAUTHORIZED,
    },
  );
}

export function NotFound(message?: string) {
  return NextResponse.json(
    {
      message: message ?? "NOT FOUND",
    },
    {
      status: StatusCodes.NOT_FOUND,
    },
  );
}

export const NotFoundMessages = {
  entityNotFound(entityName: string, entityUid: string) {
    return `Entity ${entityName} with ID '${entityUid}' not found.`;
  },
};
