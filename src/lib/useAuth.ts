import * as fbContext from "@/lib/firebase";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";

export function useAuth() {
  const [currUser, setCurrUser] = useState<User | null>(null);

  useEffect(() => {
    fbContext.auth.onAuthStateChanged((user) => {
      setCurrUser(user);
    });
  });

  return { currUser };
}
