import TypedTextAnimation from "@/components/animation/typed-text-animation";
import { useServerStripe } from "@/lib/useServerStripe";
import PricingGrid from "./pricing-grid";

export default async function PricingSection() {
  const resp = await fetch(
    "https://v6.exchangerate-api.com/v6/b29af782ee8d3333d17f6fe3/latest/GBP",
  );

  let rates: { [k: string]: number } = {};
  if (resp.ok) {
    rates = (await resp.json()).conversion_rates;
  }

  const { getPrices } = useServerStripe();
  const prices = await getPrices();

  const priceSingle = parseFloat(prices.single.unit_amount_decimal!) / 100;
  const priceDouble =
    parseFloat(prices.subscription.unit_amount_decimal!) / 100;

  return (
    <div className="landing-section" id="pricing">
      <h1 className="my-[52px] lg:mb-[62px] flex flex-row items-center justify-between">
        <TypedTextAnimation text="Pricing" />
      </h1>

      <PricingGrid
        rates={rates}
        prices={{
          single: priceSingle,
          subscription: priceDouble,
        }}
      />
    </div>
  );
}
