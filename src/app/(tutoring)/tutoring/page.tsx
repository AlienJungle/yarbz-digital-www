import AboutMeSection from "@/components/tutoring/landing/about-me-section";
import ConsiderTutoringSection from "@/components/tutoring/landing/consider-tutoring-section";
import HeroSection from "@/components/tutoring/landing/hero-section";
import HowItWorksSection from "@/components/tutoring/landing/how-it-works-section";
import PricingSection from "@/components/tutoring/landing/pricing-section";
import ReviewsSection from "@/components/tutoring/landing/reviews-section";
import ServicesSection from "@/components/tutoring/landing/services-section";

export default function Home() {
  return (
    <main>
      <div className="container relative mx-auto">
        <div className="relative mx-auto max-w-[1124px]">
          <HeroSection />
          <ServicesSection />
          <AboutMeSection />
          <ReviewsSection />
          <ConsiderTutoringSection />
          <HowItWorksSection />
          <PricingSection />
        </div>
      </div>
    </main>
  );
}
