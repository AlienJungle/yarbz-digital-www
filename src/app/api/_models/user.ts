import { DecodedIdToken } from "firebase-admin/auth";

export interface User {
  name?: string;
  available_sessions: number;
  is_admin: boolean;
}

export interface DecodedIdTokenUser extends User, DecodedIdToken {}
