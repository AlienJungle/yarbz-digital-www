import { DecodedIdTokenUser } from "@/app/api/_models/user";
import { cookies } from "next/headers";

export function useServerAuth() {
  const getCurrentUser = async (): Promise<DecodedIdTokenUser | null> => {
    const sessionCookie = cookies().get(process.env.SESSION_COOKIE_NAME)?.value ?? "";

    const res = await fetch(process.env.NEXT_PUBLIC_SITE_URL + "/api/auth/me", {
      credentials: "include",
      headers: {
        Cookie: `${process.env.SESSION_COOKIE_NAME}=${sessionCookie}`,
      },
    });

    if (res.ok) {
      return res.json();
    }

    return null;
  };

  return { getCurrentUser };
}
