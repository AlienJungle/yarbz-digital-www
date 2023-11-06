import { useEffect, useState } from "react";
import { DBUser } from "./firebase";
import { useAuth } from "./useAuth";

export default function useUser() {
  const { currUser } = useAuth();

  const [currDbUser, setCurrDbUser] = useState<DBUser | null>(null);

  useEffect(() => {
    if (!currUser) return;

    getUser(currUser!.uid).then((dbUser) => setCurrDbUser(dbUser));
  }, [currUser]);

  const getUser = async (uid: string): Promise<DBUser> => {
    const response = fetch(`/api/users/${uid}`);
    return (await response).json();
  };

  return {
    currDbUser,
    getUser,
  };
}
