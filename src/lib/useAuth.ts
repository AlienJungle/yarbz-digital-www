import * as fbContext from "@/lib/firebase";
import { FirebaseError } from "firebase/app";
import { GithubAuthProvider, GoogleAuthProvider, UserCredential, getIdToken, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export function useAuth() {
  const loginWithEmailAndPassword = (email: string, password: string): Promise<void> => {
    return signInWithEmailAndPassword(fbContext.auth, email, password)
      .then((credential: UserCredential) => loginWithIdToken(credential))
      .catch((error) => {
        console.error(JSON.stringify(error));

        const fbError = error as FirebaseError;
        switch (fbError.code) {
          case "auth/invalid-login-credentials":
            throw "The given credentials were invalid. Please ensure you're using the correct username and password, and try again.";
          default:
            throw "Something went wrong: " + fbError.message ?? error;
        }
      })
      .then(() => {
        fbContext.auth.signOut();
      });
  };

  const loginWithProvider = (provider: GoogleAuthProvider | GithubAuthProvider) => {
    return signInWithPopup(fbContext.auth, provider)
      .then((credential: UserCredential) => loginWithIdToken(credential))
      .then(() => window.location.assign("/tutoring/dashboard"))
      .catch((error) => {
        console.error("Error occurred while logging in: " + JSON.stringify(error));

        const fbError = error as FirebaseError;
        switch (fbError.code) {
          case "auth/account-exists-with-different-credential":
            throw "An account already exists with us for the email associated with your third-party account.";

          default:
            throw "Something went wrong: " + error.message ?? error;
        }
      });
  };

  const logout = () => {
    window.location.assign("/api/auth/logout");
  };

  return { loginWithEmailAndPassword, loginWithProvider, logout };
}

function loginWithIdToken(credential: UserCredential): Promise<Response> {
  return getIdToken(credential.user).then((idToken) => {
    const body = {
      idToken,
    };

    return fetch("/api/auth/session-login", {
      method: "POST",
      body: JSON.stringify(body),
    });
  });
}
