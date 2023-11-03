"use client";

import iconEmail from "@/../public/icon-email.svg";
import iconGitHub from "@/../public/icon-github.svg";
import iconGoogle from "@/../public/icon-google.svg";

import Image from "next/image";

import Button from "@/components/tutoring/button";
import * as fbContext from "@/lib/firebase";
import { useCustomRouter } from "@/lib/useCustomRouter";
import { FirebaseError } from "firebase-admin";
import { Auth, GithubAuthProvider, GoogleAuthProvider, UserCredential, signInWithPopup } from "firebase/auth";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useCustomRouter();
  const searchParams = useSearchParams();

  const redirectAfterLogin = () => {
    const redirect = searchParams.get("redirect");
    router.push(redirect ?? "/tutoring/dashboard");
  };

  const handleGoogleLoginClick = () => {
    const provider = new GoogleAuthProvider();
    handleProviderLogin(fbContext.auth, provider).then(() => redirectAfterLogin());
  };

  const handleGitHubLoginClick = () => {
    const provider = new GithubAuthProvider();
    handleProviderLogin(fbContext.auth, provider).then(() => redirectAfterLogin());
  };

  return (
    <main>
      <div className="container mx-auto">
        <div className="max-w-[400px] mx-auto relative">
          <h1 className="text-3xl font-semibold mt-20 mb-10">Student login</h1>

          <div className="flex flex-col gap-y-[20px]">
            <Button theme="grey" onClick={handleGoogleLoginClick} className="flex flex-row items-center justify-center gap-x-[10px]">
              <Image src={iconGoogle} alt="" width={25} />
              Sign in with Google
            </Button>

            <Button theme="grey" onClick={handleGitHubLoginClick} className="flex flex-row items-center justify-center gap-x-[10px]">
              <Image src={iconGitHub} alt="" width={30} />
              Sign in with GitHub
            </Button>

            <Button
              theme="grey"
              onClick={() => {
                router.push("/tutoring/login/email", {
                  preserveQuery: true,
                });
              }}
              className="flex flex-row items-center justify-center gap-x-[10px]"
            >
              <Image src={iconEmail} width={25} alt="" />
              Sign in with email & password
            </Button>

            <hr />

            <p>Don&apos;t have an account yet? You can sign up instantly using the &apos;Sign in with Google&apos; link above, or you can create an account with an email and password by following the below link.</p>
            <Button
              theme="black"
              onClick={() => {
                router.push("/tutoring/signup", {
                  preserveQuery: true,
                });
              }}
            >
              Sign up with email & password
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
type SupportedProvider = GoogleAuthProvider | GithubAuthProvider;

function handleProviderLogin(auth: Auth, provider: SupportedProvider): Promise<UserCredential> {
  return new Promise((resolve, reject) => {
    signInWithPopup(auth, provider)
      .then((result: UserCredential) => {
        const user = result.user;
        if (user) {
          resolve(result);
        } else {
          throw "User was not returned.";
        }
      })
      .catch((error) => {
        console.error("Error occurred while logging in: " + JSON.stringify(error));

        const fbError = error as FirebaseError;
        switch (fbError.code) {
          case "auth/account-exists-with-different-credential":
            alert("An account already exists with us for the email associated with your third-party account.");
            break;

          default:
            alert("Something went wrong: " + error.message ?? error);
            break;
        }

        reject(error);
      });
  });
}
