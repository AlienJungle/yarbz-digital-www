"use client";

import { Session } from "@/app/api/_models/session";
import Alert from "@/components/alert";
import { UserContext } from "@/components/providers/user-provider";
import BillingCard from "@/components/tutoring/dashboard/billing-card";
import PreviousSessionsCard from "@/components/tutoring/dashboard/previous-sessions-card";
import SessionsCard from "@/components/tutoring/dashboard/sessions-card";
import SupportCard from "@/components/tutoring/dashboard/support-card";
import UpcomingSessionsCard from "@/components/tutoring/dashboard/upcoming-sessions-card";
import Modal from "@/components/tutoring/modal";
import CancelSessionModalContent from "@/components/tutoring/modal-content/cancel-session-modal-content";
import { useSearchParams } from "next/navigation";
import { useContext, useState } from "react";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const userCtx = useContext(UserContext);

  const currUser = userCtx.currentUser;

  const [cancellingSession, setCancellingSession] = useState<
    Session | undefined
  >(undefined);

  return (
    <main>
      <div className="container mx-auto my-20 px-5">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-10 lg:mb-0">
          <h1 className="text-3xl font-semibold my-4 lg:my-10">Dashboard</h1>
          {currUser && (
            <span className="flex flex-row items-center gap-x-[10px]">
              <span className="text-base opacity-50 font-semibold ">
                logged in as {currUser.name} ({currUser!.email})
              </span>
              {/* <Image
                src={currUser.picture!}
                width={30}
                height={30}
                alt={"Image of " + currUser.name}
                className="rounded-full hidden lg:inline"
              /> */}
            </span>
          )}
        </div>

        {searchParams?.get("purchase") === "true" && (
          <Alert className="mb-10">
            Your purchase was successful! You can now go ahead and book a
            lesson.
          </Alert>
        )}

        {searchParams?.get("bookedsession") === "true" && (
          <Alert className="mb-10">Your session was booked successfully!</Alert>
        )}

        <div className="grid lg:grid-cols-4 xl:grid-cols-12 gap-[30px] lg:gap-[50px]">
          <div className="lg:col-span-2 xl:col-span-4">
            <SessionsCard
              availableSessions={currUser?.available_sessions ?? 0}
            />
          </div>

          <div className="lg:col-span-2 xl:col-span-4">
            <BillingCard />
          </div>

          <div className="lg:col-span-2  xl:col-span-4">
            <SupportCard />
          </div>

          <div className="lg:col-span-2 xl:col-span-5">
            <PreviousSessionsCard />
          </div>

          <div className="lg:col-span-4 xl:col-span-7">
            <UpcomingSessionsCard
              onCancel={(session) => setCancellingSession(session)}
            />
          </div>
        </div>
      </div>

      <Modal
        title="Cancel session"
        isOpen={!!cancellingSession}
        onClose={() => setCancellingSession(undefined)}
        className="lg:max-w-[600px]"
      >
        {cancellingSession && (
          <CancelSessionModalContent
            onClose={() => setCancellingSession(undefined)}
            onCancel={() => null}
            session={cancellingSession}
          />
        )}
      </Modal>
    </main>
  );
}
