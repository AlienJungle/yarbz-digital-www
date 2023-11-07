import iconExternal from "@/../public/icon-external.svg";
import { statics } from "@/static";
import classNames from "classnames";
import Image from "next/image";
import { THEME_CLASSNAME_BLACK } from "../button";
import Card from "../card";

export default function BillingCard() {
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
