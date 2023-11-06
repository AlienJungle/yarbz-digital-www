"use client";

import iconExternal from "@/../public/icon-external.svg";
import Alert from "@/components/alert";
import { UserContext } from "@/components/providers/user-provider";
import Button, { THEME_CLASSNAME_BLACK } from "@/components/tutoring/button";
import Card from "@/components/tutoring/card";
import { statics } from "@/static";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext } from "react";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const userCtx = useContext(UserContext);

  const currUser = userCtx.currentUser;

  return (
    <main>
      <div className="container mx-auto my-20">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-3xl font-semibold my-10">Dashboard</h1>
          {currUser && (
            <span className="flex flex-row items-center gap-x-[10px]">
              <span className="text-base opacity-50 font-semibold ">
                logged in as {currUser.name} ({currUser!.email})
              </span>
              <Image src={currUser.picture!} width={30} height={30} alt={"Image of " + currUser.name} className="rounded-full" />
            </span>
          )}
        </div>

        {searchParams.get("purchase") === "true" && <Alert className="mb-10">Your purchase was successful! You can now go ahead and book a lesson.</Alert>}

        <div className="grid grid-cols-6 gap-[50px]">
          <div className="col-span-2">
            <SessionsCard availableSessions={currUser?.available_sessions ?? 0} />
          </div>

          <div className="col-span-2">
            <BillingCard />
          </div>

          <div className="col-span-2">
            <SupportCard />
          </div>

          <div className="col-span-3 card-tut">
            <h2 className="text-xl font-bold">Your previous sessions (0)</h2>
          </div>

          <div className="col-span-3 card-tut">
            <h2 className="text-xl font-bold">Upcoming lessons</h2>
          </div>
        </div>
      </div>
    </main>
  );
}

interface SessionsCardProps {
  availableSessions: number;
}

function SessionsCard(props: SessionsCardProps) {
  const router = useRouter();

  return (
    <Card title="Sessions" className="h-full flex flex-col">
      <p className="flex-grow block">
        You have <strong>{props.availableSessions} sessions</strong> to use.
      </p>

      <div className="flex flex-col gap-y-[10px]">
        <Button theme="green" onClick={() => router.push("/tutoring/dashboard/book-session")}>
          Book a session
        </Button>
        <Link href={"/tutoring#pricing"} className={classNames("btn-tut text-center", THEME_CLASSNAME_BLACK)}>
          Buy more sessions
        </Link>
      </div>
    </Card>
  );
}

function BillingCard() {
  return (
    <Card title="Billing & Subscription" className="h-full">
      <p className="mt-4 mb-6">Your billing account and subscription (if applicable) are managed via Stripe. Click the button below to access your Stripe dashboard to manage billing.</p>
      <a href={statics.stripeCustomerLogin} className={classNames("btn-tut flex flex-row items-center gap-x-[10px] justify-center", THEME_CLASSNAME_BLACK)} target="_blank" rel="nofollow noopener">
        Manage billing account
        <Image src={iconExternal} alt="" />
      </a>
    </Card>
  );
}

function SupportCard() {
  return (
    <Card title="Support" className="h-full">
      <p>
        If you have questions or need support, please send an email to{" "}
        <a href="mailto:aaron@yarbz.digital" className="font-bold">
          aaron@yarbz.digital
        </a>
        . I&apos;ll get back to you as soon as I can!
      </p>
    </Card>
  );
}
