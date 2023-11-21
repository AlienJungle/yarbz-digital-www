import RebrandBanner from "@/components/rebrand-banner";

import ClientsSection from "@/components/landing/ClientsSection";
import HeaderSection from "@/components/landing/HeaderSection";
import ReviewsSection from "@/components/landing/ReviewsSection";
import ServicesSection from "@/components/landing/ServicesSection";
import WorkSection from "@/components/landing/WorkSection";
import { Metadata } from "next";

export const metadata: Metadata = {};

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <>
      {searchParams.rebrandNotice === "true" && <RebrandBanner />}
      <main>
        <HeaderSection />
        <ServicesSection />
        <WorkSection />
        <ClientsSection />
        <ReviewsSection />
      </main>
    </>
  );
}
