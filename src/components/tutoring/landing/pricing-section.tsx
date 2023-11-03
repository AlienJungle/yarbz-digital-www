"use client";

import { useAuth } from "@/lib/useAuth";
import { statics } from "@/static";
import PricingCard from "../pricing-card";

export default function PricingSection() {
  const { currUser } = useAuth();

  const redirectIfNotAuthed = (url: string) => {
    const destinationHref = !currUser ? `/tutoring/login?redirect=${url}` : url;
    window.open(destinationHref, "_blank");
  };

  const pricingURLSingle = process.env.NODE_ENV === "production" ? statics.pricingURLs.singleSession : statics.pricingURLs.test.singleSession;
  const pricingURLSubscription = process.env.NODE_ENV === "production" ? statics.pricingURLs.subscriptionSession : statics.pricingURLs.test.subscriptionSession;

  return (
    <div className="my-32" id="pricing">
      <h1 className="text-3xl font-semibold leading-[60px] mb-[62px]">Pricing</h1>
      <div className="grid grid-cols-3 gap-x-[76px]">
        <div>
          <PricingCard
            title="Trial lesson"
            ctaText="Book a trial lesson"
            ctaAction={() => {
              window.open("https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ24pUf9kjQ4MdhDdR0N9s24X8PI6lRGo2lVMciZLNDQWDmO9EnRBBcC6q9L6qA4KbwbDegD66lP", "_blank");
            }}
          >
            <>
              Everyone gets one <strong>free 45-minute trial lesson</strong>. We&apos;ll use this to get to know each other, discuss your goals, and develop a learning plan to help you reach your goals.
            </>
          </PricingCard>
        </div>

        <div>
          <PricingCard
            title="Single session"
            ctaText="Purchase sessions"
            ctaAction={() => {
              redirectIfNotAuthed(pricingURLSingle);
            }}
            price="£20/session"
          >
            <>You can book one or many single sessions, which you can then book with me when you want. All lessons can be rescheduled.</>
          </PricingCard>
        </div>

        <div>
          <PricingCard
            title="Subscription"
            ctaText="Purchase a subscription"
            ctaAction={() => {
              redirectIfNotAuthed(pricingURLSubscription);
            }}
            price="£17/session"
          >
            <>A subscription will purchase a given number of lessons every month until you cancel it. All subscriptions receive a 15% discount. You can end the subscription at any time.</>
          </PricingCard>
        </div>
      </div>
    </div>
  );
}
