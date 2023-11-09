import { Session } from "@/app/api/_models/session";
import { User } from "@/app/api/_models/user";

import { firebaseConfig } from "./firebase-config";

import { App, cert, getApp, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { DocumentData, getFirestore } from "firebase-admin/firestore";
import { FirebaseError } from "firebase/app";

const serviceAccount = require("../../firebase-serviceaccount.json");

const app: App = (() => {
  try {
    return getApp();
  } catch (error) {
    const firebaseError = error as FirebaseError;

    switch (firebaseError.code) {
      case "app/no-app":
        console.log("Initializing firebase app...");
        return initializeApp({
          ...firebaseConfig,
          // No need to import credential in firebase production environment
          credential: cert(serviceAccount),
        });

      default:
        throw error;
    }
  }
})();

export default app;

export const auth = getAuth();
export const db = getFirestore();

export const getDbUser = async (uid: string): Promise<DocumentData | null> => {
  const userRef = db.collection("users").doc(uid);
  const doc = await userRef.get();
  return doc.exists ? doc.data()! : null;
};

export const createDbUser = async (uid: string, user: User) => {
  const doc = db.collection("users").doc(uid);
  await doc.set(user);
  return doc;
};

export const createSession = async (session: Session) => {
  const doc = db.collection("sessions").doc();
  await doc.set(session);
  return doc;
};

export const updateSession = async (uid: string, session: Pick<Session, "meeting_link">) => {
  return await db.collection("sessions").doc(uid).update({
    meeting_link: session.meeting_link,
  });
};

export const getUserSessions = async (uid: string) => {
  const userDoc = db.collection("users").doc(uid);
  const query = db.collection("sessions").where("user", "==", userDoc).orderBy("start_date", "desc");

  const docs = (await query.get()).docs;
  return docs;
};
