"use client";

import { DecodedIdTokenUser } from "@/app/api/_models/user";
import { PropsWithChildren, createContext } from "react";

export const UserContext = createContext<{ currentUser: DecodedIdTokenUser | null }>({ currentUser: null });

interface UserProviderProps extends PropsWithChildren {
  currentUser: DecodedIdTokenUser | null;
}

export default function UserProvider({ currentUser, children }: UserProviderProps) {
  return (
    <UserContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
