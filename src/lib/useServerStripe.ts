import { statics } from "@/static";
import { Stripe } from "stripe";
import { GlobalRef } from "./GlobalRef";

const stripeClient = new GlobalRef<Stripe>("stripe-client");
if (!stripeClient.value) {
  console.log("Creating new instance of stripe client...");
  stripeClient.value = new Stripe(process.env.STRIPE_SECRET_KEY);
}

export function useServerStripe() {
  let pricingIds: { single: string; subscription: string };
  if (process.env.NODE_ENV === "development") {
    pricingIds = {
      single: statics.pricingIDs.test.singleSession,
      subscription: statics.pricingIDs.test.subscriptionSession,
    };
  } else {
    pricingIds = {
      single: "TODO",
      subscription: "TODO",
    };
  }

  const getPrices = async () => {
    const prices = await Promise.all([
      stripeClient.value!.prices.retrieve(pricingIds.single),
      stripeClient.value!.prices.retrieve(pricingIds.subscription),
    ]);

    return {
      single: prices[0] as Stripe.Price,
      subscription: prices[1] as Stripe.Price,
    };
  };

  return { getPrices };
}
