import TypedTextAnimation from "@/components/animation/typed-text-animation";
import PricingGrid from "./pricing-grid";

export default async function PricingSection() {
  const resp = await fetch("https://v6.exchangerate-api.com/v6/b29af782ee8d3333d17f6fe3/latest/GBP");

  let rates: { [k: string]: number } = {};
  if (resp.ok) {
    rates = (await resp.json()).conversion_rates;
  }

  console.log(rates);

  return (
    <div className="landing-section" id="pricing">
      <h1 className="my-[52px] lg:mb-[62px] flex flex-row items-center justify-between">
        <TypedTextAnimation text="Pricing" />
      </h1>

      <PricingGrid rates={rates} />
    </div>
  );
}
