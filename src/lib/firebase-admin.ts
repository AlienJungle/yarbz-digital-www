import { User } from "@/app/api/_models/user";
import * as admin from "firebase-admin";
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
  return db.collection("users").doc(uid).set(user);
};
