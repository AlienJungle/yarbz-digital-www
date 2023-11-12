import { headers } from "next/headers";

export function getURLFromRequestContext(): URL {
  const headerList = headers();
  const url = headerList.get("x-url") ?? "";
  return new URL(url);
}
