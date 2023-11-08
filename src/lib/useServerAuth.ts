import { DecodedIdTokenUser } from "@/app/api/_models/user";
import { getURLFromRequestContext } from "@/server-helpers";
import { cookies } from "next/headers";
import { fetchLogged } from "./fetch";

export function useServerAuth() {
  const getCurrentUser = async (): Promise<DecodedIdTokenUser | null> => {
    const url = getURLFromRequestContext();
    const sessionCookie = cookies().get(process.env.SESSION_COOKIE_NAME)?.value ?? "";

    const res = await fetchLogged(url.origin + "/api/auth/me", {
      credentials: "include",
      headers: {
        Cookie: sessionCookie ? `${process.env.SESSION_COOKIE_NAME}=${sessionCookie}` : "",
      },
    });

    if (res.ok) {
      return res.json();
    }

    return null;
  };

  return { getCurrentUser };
}
