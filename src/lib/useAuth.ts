// import * as fbContext from "@/lib/firebase";
import { FirebaseError } from "firebase/app";
import { GithubAuthProvider, GoogleAuthProvider, UserCredential, getIdToken, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";

export function useAuth() {
  async function loginWithIdToken(credential: UserCredential): Promise<Response> {
    const idToken = await getIdToken(credential.user);
    const body = {
      idToken,
    };
    return await fetch("/api/auth/session-login", {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  const loginWithEmailAndPassword = async (email: string, password: string, redirect?: string): Promise<void> => {
    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      await loginWithIdToken(credential);
      window.location.assign(redirect ?? "/tutoring/dashboard");
    } catch (error) {
      console.error(JSON.stringify(error));
      const fbError = error as FirebaseError;
      switch (fbError.code) {
        case "auth/invalid-login-credentials":
          throw "The given credentials were invalid. Please ensure you're using the correct username and password, and try again.";
        default:
          throw "Something went wrong: " + fbError.message ?? error;
      }
    }

    auth.signOut();
  };

  const loginWithProvider = async (provider: GoogleAuthProvider | GithubAuthProvider, redirect?: string) => {
    try {
      const credential = await signInWithPopup(auth, provider);
      await loginWithIdToken(credential);
      window.location.assign(redirect ?? "/tutoring/dashboard");
    } catch (error: any) {
      console.error("Error occurred while logging in: " + JSON.stringify(error));

      const fbError = error as FirebaseError;
      switch (fbError.code) {
        case "auth/account-exists-with-different-credential":
          throw "An account already exists with us for the email associated with your third-party account.";

        default:
          throw "Something went wrong: " + error.message ?? error;
      }
    }
  };

  const logout = () => {
    window.location.assign("/api/auth/logout");
  };

  return { loginWithEmailAndPassword, loginWithProvider, logout };
}
