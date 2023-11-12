// import * as fbContext from "@/lib/firebase";
import { FirebaseError } from "firebase/app";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  UserCredential,
  getIdToken,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./firebase";

export function useAuth() {
  const loginWithEmailAndPassword = async (
    email: string,
    password: string,
    redirect?: string,
  ): Promise<void> => {
    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      return loginWithCredential(credential, redirect);
    } catch (error) {
      handleLoginError(error);
    }
  };

  const loginWithProvider = async (
    provider: GoogleAuthProvider | GithubAuthProvider,
    redirect?: string,
  ): Promise<void> => {
    try {
      const credential = await signInWithPopup(auth, provider);
      return loginWithCredential(credential, redirect);
    } catch (error: any) {
      handleLoginError(error);
    }
  };

  const logout = () => {
    window.location.assign("/api/auth/logout");
  };

  /*---*/

  async function loginWithIdToken(
    credential: UserCredential,
  ): Promise<Response> {
    const idToken = await getIdToken(credential.user);
    const body = {
      idToken,
    };
    return await fetch("/api/auth/session-login", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  function handleLoginError(error: any) {
    console.error("Error occurred while logging in: " + JSON.stringify(error));

    const fbError = error as FirebaseError;
    switch (fbError.code) {
      case "auth/account-exists-with-different-credential":
        throw "An account already exists with us for the email associated with your third-party account.";

      default:
        throw "Something went wrong: " + error.message ?? error;
    }
  }

  async function loginWithCredential(
    credential: UserCredential,
    redirect?: string,
  ) {
    const resp = await loginWithIdToken(credential);

    await auth.signOut();
    if (resp.ok) {
      window.location.assign(redirect ?? "/tutoring/dashboard");
      return;
    }

    throw "An error occurred while logging in: " + (await resp.text());
  }

  return { loginWithEmailAndPassword, loginWithProvider, logout };
}
