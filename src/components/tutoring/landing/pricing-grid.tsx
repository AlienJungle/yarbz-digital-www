"use client";

import { UserContext } from "@/components/providers/user-provider";
import { introBurstIn } from "@/lib/animations";
import * as motion from "@/lib/motion";
import { statics } from "@/static";
import { useContext, useState } from "react";
import PricingCard from "../pricing-card";

interface PricingGridProps {
  rates: { [k: string]: number };
}

export default function PricingGrid({ rates }: PricingGridProps) {
  const userCtx = useContext(UserContext);
  const currentUser = userCtx.currentUser;

  const redirectIfNotAuthed = (url: string) => {
    const destinationHref = !currentUser ? `/tutoring/login?redirect=${url}` : url;
    window.open(destinationHref, "_blank");
  };

  const pricingURLSingle = process.env.NODE_ENV === "production" ? statics.pricingURLs.singleSession : statics.pricingURLs.test.singleSession;
  const pricingURLSubscription = process.env.NODE_ENV === "production" ? statics.pricingURLs.subscriptionSession : statics.pricingURLs.test.subscriptionSession;

  const currencySelect = [
    { label: "£ (GBP)", value: "GBP" },
    { label: "$ (USD)", value: "USD" },
    { label: "€ (EUR)", value: "EUR" },
  ];

  const getCurrencySymbol = () => {
    switch (currency) {
      case "GBP":
        return "£";
      case "USD":
        return "$";
      case "EUR":
        return "€";
      default:
        return "";
    }
  };

  // const [rate, setRate] = useState(1);
  const [currency, setCurrency] = useState("GBP");

  return (
    <>
      <motion.div
        className="grid lg:grid-cols-3 gap-x-[76px] gap-y-[25px] lg:gap-y-[20px]"
        initial="hidden"
        whileInView={"visible"}
        viewport={{ once: true }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        <motion.div variants={introBurstIn}>
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
        </motion.div>

        <motion.div variants={introBurstIn}>
          <PricingCard
            title="Single session"
            ctaText="Purchase sessions"
            ctaAction={() => {
              redirectIfNotAuthed(pricingURLSingle);
            }}
            price={`${getCurrencySymbol()}${Math.round(20 * rates[currency])}/session`}
          >
            <>You can book one or many single sessions, which you can then book with me when you want. All lessons can be rescheduled.</>
          </PricingCard>
        </motion.div>

        <motion.div variants={introBurstIn}>
          <PricingCard
            title="Subscription"
            ctaText="Purchase a subscription"
            ctaAction={() => {
              redirectIfNotAuthed(pricingURLSubscription);
            }}
            price={`${getCurrencySymbol()}${Math.round(17 * rates[currency])}/session`}
          >
            <>A subscription will purchase a given number of lessons every month until you cancel it. All subscriptions receive a 15% discount. You can end the subscription at any time.</>
          </PricingCard>
        </motion.div>
      </motion.div>
      <motion.div className="flex flex-col items-end gap-y-[20px] mt-[30px]" variants={introBurstIn} initial="hidden" whileInView={"visible"} viewport={{ once: true }}>
        <div className="flex flex-row w-full justify-end items-center gap-x-[10px]">
          <p>Show prices as:</p>
          <select className="tut-form-control text-base max-w-[120px]" onChange={(e) => setCurrency(e.target.value)}>
            {currencySelect.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <p className="text-sm max-w-[270px]">Prices converted automatically using live data. £1 = {getCurrencySymbol() + rates[currency]}. All purchases are made in GBP. Currency conversion made by your bank.</p>
      </motion.div>
    </>
  );
}
