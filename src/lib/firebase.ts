// Import the functions you need from the SDKs you need

import { DocumentData } from "firebase-admin/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./firebase-config";

// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
const app = initializeApp(firebaseConfig); // Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
auth.setPersistence({
  type: "NONE",
});
export const db = getFirestore(app);
export default app;

export interface DBUser {
  available_sessions: number;
  is_admin: boolean;
}

export const getDbUser = async (uid: string): Promise<DocumentData | undefined> => {
  const userDocRef = doc(db, "users", uid);
  const userDoc = await getDoc(userDocRef);
  return userDoc.data();
};
