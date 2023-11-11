import { NextApiRequest } from "next";
import { Readable } from "stream";

// Get raw body as string
async function getRawBody(readable: Readable): Promise<Buffer> {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export async function jsonFromRaw(req: NextApiRequest) {
  const rawBody = await getRawBody(req);
  return JSON.parse(Buffer.from(rawBody).toString("utf8"));
}
