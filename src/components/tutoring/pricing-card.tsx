"use client";

import { PropsWithChildren } from "react";
import Button from "./button";
import Card from "./card";

interface PricingCardProps {
  title: string;
  price?: string;
  ctaText: string;
  ctaAction: () => void;
}

export default function PricingCard(props: PricingCardProps & PropsWithChildren) {
  const { title, ctaText, ctaAction, price, children } = props;

  return (
    <Card theme="green" className="flex flex-col items-center p-[20px] lg:p-[34px]">
      <h2 className="text-lg lg:text-xl font-semibold lg:mt-[10px] mb-[20px] lg:mb-[40px]">{title}</h2>
      <p className="mb-[30px] lg:mb-[46px]">{children}</p>
      {price && <p className="mb-[30px] lg:mt-[26px] lg:mb-[40px] text-xl lg:text-2xl font-semibold">{price}</p>}
      <Button theme="black" className="w-full" onClick={ctaAction}>
        {ctaText}
      </Button>
    </Card>
  );
}
