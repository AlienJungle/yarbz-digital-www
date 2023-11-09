import { DecodedIdTokenUser, User } from "@/app/api/_models/user";
import { FirebaseError } from "firebase-admin";
import { cookies } from "next/headers";
import { auth, getDbUser } from "./firebase-admin";

export function useServerAuth() {
  const getCurrentUser = async (): Promise<DecodedIdTokenUser | null> => {
    const sessionCookie = cookies().get(process.env.SESSION_COOKIE_NAME)?.value ?? "";
    if (!sessionCookie) return null;

    try {
      // TODO: Move getCurrentUser logic to firebase-admin.ts
      const claims = await auth.verifySessionCookie(sessionCookie, true);

      const currDbUser = await getDbUser(claims.uid);
      if (!currDbUser) {
        throw "Could not find user record";
      }

      const decodedIdTokenUser: DecodedIdTokenUser = {
        ...claims,
        ...(currDbUser as User),
      };

      return decodedIdTokenUser;
    } catch (error) {
      const firebaseError = error as FirebaseError;
      console.error("Could not get current user", JSON.stringify(firebaseError));
      return null;
    }
  };

  return { getCurrentUser };
}
