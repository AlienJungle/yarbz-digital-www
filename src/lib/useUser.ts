import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

export interface DBUser {
  available_sessions: number;
}

export default function useUser() {
  const { currUser } = useAuth();

  const [currDbUser, setCurrDbUser] = useState<DBUser | null>(null);

  useEffect(() => {
    if (!currUser) return;

    getUser(currUser!.uid).then((dbUser) => setCurrDbUser(dbUser));
  }, [currUser]);

  const getUser = async (uid: string): Promise<DBUser> => {
    const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);

    userDoc.data();

    return userDoc.data() as DBUser;
  };

  return {
    currDbUser,
    getUser,
  };
}
