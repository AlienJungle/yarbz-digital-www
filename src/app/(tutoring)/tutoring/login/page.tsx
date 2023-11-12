"use client";

import iconEmail from "@/../public/icon-email.svg";
import iconGitHub from "@/../public/icon-github.svg";
import iconGoogle from "@/../public/icon-google.svg";

import Image from "next/image";

import Button from "@/components/tutoring/button";
import { useAuth } from "@/lib/useAuth";
import { useCustomRouter } from "@/lib/useCustomRouter";
import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useCustomRouter();
  const searchParams = useSearchParams();

  const { loginWithProvider } = useAuth();

  const handleGoogleLoginClick = () => {
    loginWithProvider(
      new GoogleAuthProvider(),
      searchParams?.get("redirect") ?? undefined,
    ).catch((err) => alert(err));
  };

  const handleGitHubLoginClick = () => {
    loginWithProvider(
      new GithubAuthProvider(),
      searchParams?.get("redirect") ?? undefined,
    ).catch((err) => alert(err));
  };

  return (
    <main>
      <div className="container mx-auto">
        <div className="max-w-[400px] mx-auto relative">
          <h1 className="text-3xl font-semibold mt-20 mb-10">Student login</h1>

          <div className="flex flex-col gap-y-[20px]">
            <Button
              theme="grey"
              onClick={handleGoogleLoginClick}
              className="flex flex-row items-center justify-center gap-x-[10px]"
            >
              <Image src={iconGoogle} alt="" width={25} />
              Sign in with Google
            </Button>

            <Button
              theme="grey"
              onClick={handleGitHubLoginClick}
              className="flex flex-row items-center justify-center gap-x-[10px]"
            >
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

            <p>
              Don&apos;t have an account yet? You can sign up instantly using
              the &apos;Sign in with Google&apos; link above, or you can create
              an account with an email and password by following the below link.
            </p>
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
