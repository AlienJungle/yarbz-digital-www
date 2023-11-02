"use client";

import "firebaseui/dist/firebaseui.css";

import iconEmail from "@/../public/icon-email.svg";
import iconGoogle from "@/../public/icon-google.svg";

import Image from "next/image";
import Link from "next/link";

import Button, { THEME_CLASSNAME_BLACK } from "@/components/tutoring/button";
import * as fbContext from "@/firebase";
import { GoogleAuthProvider, UserCredential, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const authContainerID = "auth-container";

  const router = useRouter();

  const handleGoogleSignupClick = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(fbContext.auth, provider)
      .then((result: UserCredential) => {
        const user = result.user;
        if (user) {
          router.push("/tutoring/dashboard");
        } else {
          throw "User was not returned.";
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Something went wrong: " + err.message ?? err);
      });
  };

  return (
    <main>
      <div className="container mx-auto">
        <div className="max-w-[400px] mx-auto relative">
          <h1 className="text-3xl font-semibold mt-20 mb-10">Student login</h1>

          <div className="flex flex-col gap-y-[20px]">
            <Button theme="grey" onClick={handleGoogleSignupClick} className="flex flex-row items-center justify-center gap-x-[10px]">
              <Image src={iconGoogle} alt="" />
              Sign in with Google
            </Button>

            <Button
              theme="grey"
              onClick={() => {
                router.push("/tutoring/login/email");
              }}
              className="flex flex-row items-center justify-center gap-x-[10px]"
            >
              <Image src={iconEmail} width={25} alt="" />
              Sign in with email & password
            </Button>

            <hr />

            <p>Don&apos;t have an account yet? You can sign up instantly using the &apos;Sign in with Google&apos; link above, or you can create an account with an email and password by following the below link.</p>
            <Link href={"/tutoring/signup"} className={`btn-tut text-center ${THEME_CLASSNAME_BLACK}`}>
              Sign up with email & password
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
