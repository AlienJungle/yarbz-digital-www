import { DecodedIdTokenUser } from "@/app/api/_models/user";
import { getCurrentUserFromSession } from "./firebase-admin";

export function useServerAuth() {
  const getCurrentUser = async (): Promise<DecodedIdTokenUser | null> =>
    getCurrentUserFromSession();
  return { getCurrentUser };
}
