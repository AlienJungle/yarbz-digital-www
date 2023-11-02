// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCWr8OtFx2ZSlMJXkCobV5UQjoJ9pzm6vo",
  authDomain: "yarbz-digital.firebaseapp.com",
  projectId: "yarbz-digital",
  storageBucket: "yarbz-digital.appspot.com",
  messagingSenderId: "476986934161",
  appId: "1:476986934161:web:a85323d8f6b43284c45030",
  measurementId: "G-TNB0DCT9WE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
