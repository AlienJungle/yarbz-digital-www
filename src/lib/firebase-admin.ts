import { Session } from "@/app/api/_models/session";
import { User } from "@/app/api/_models/user";
import * as admin from "firebase-admin";
import { defineString } from "firebase-functions/params";
import { firebaseConfig } from "./firebase-config";

const serviceAccount = require("../../firebase-serviceaccount.json");

const app = admin.apps.length
  ? admin.app()
  : admin.initializeApp({
      ...firebaseConfig,
      credential: admin.credential.cert(serviceAccount),
    });
export default app;

export const auth = app.auth();
export const db = app.firestore();

export const getDbUser = async (uid: string): Promise<admin.firestore.DocumentData | null> => {
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

export const environment = {
  nextPublicSiteUrl: defineString("NEXT_PUBLIC_SITE_URL", {
    default: "https://yarbz-digital.web.app",
  }).value(),
  sessionCookieName: defineString("SESSION_COOKIE_NAME", {
    default: "session",
  }).value(),
};
