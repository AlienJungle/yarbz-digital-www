import Image from "next/image";

// Images
import aaron from "@/../public/aaron@2x.png";
import arrowHappyClients from "@/../public/arrow-happy-clients@2x.png";
import arrowRecentWork from "@/../public/arrow-recent-work@2x.png";
import bgWave from "@/../public/bg-wave.png";
import blobBlue from "@/../public/blob-blue.svg";
import blobOrange from "@/../public/blob-orange.svg";
import clientAverbis from "@/../public/client-averbis@2x.png";
import clientFFF from "@/../public/client-fff@2x.png";
import clientHippo from "@/../public/client-hippo@2x.png";
import clientSportank from "@/../public/client-sportank@2x.png";
import testAverbis from "@/../public/test-averbis.webp";
import testDanD from "@/../public/test-dan-d.jpg";
import testMert from "@/../public/test-mert.webp";
import testPhilS from "@/../public/test-phil-s.jpg";
import thumbAccessibility from "@/../public/thumb-accessibility.png";
import thumbBespokeDev from "@/../public/thumb-bespoke-dev.png";
import thumbHosting from "@/../public/thumb-hosting.png";
import workFFF from "@/../public/work-fff.png";
import workNSFGroup from "@/../public/work-nsfgroup.png";
import workRehomeDog from "@/../public/work-rehome-dog.png";
import workSportank from "@/../public/work-sportank.png";

import { introVariants } from "@/animations";
import TypedTextAnimation from "@/components/animation/typed-text-animation";
import HireMeButton from "@/components/hire-me-button";
import RebrandBanner from "@/components/rebrand-banner";
import ServiceCard from "@/components/service-card";
import Testimonial from "@/components/testimonial";
import TestimonialSlider from "@/components/testimonial-slider";
import WorkImage from "@/components/work-image";
import WorkSlider from "@/components/work-slider";
import * as motion from "@/lib/motion";
import { Variants } from "framer-motion";
import { Metadata } from "next";

export const metadata: Metadata = {};

export default function Home({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
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

function HeaderSection(): JSX.Element {
  const headingVariants: Variants = {
    hidden: {
      y: "-100px",
      opacity: 0,
      scale: 0,
    },
    visible: {
      y: "0px",
      opacity: 1,
      scale: 1,
    },
  };

  return (
    <header className="h-[calc(100vh-142px)] min-h-[700px] flex flex-col items-center relative w-full justify-center">
      <Image
        src={bgWave}
        fill={true}
        alt=""
        style={{
          objectFit: "cover",
        }}
        className="pointer-events-none"
      />
      <motion.h1
        className="font-semibold text-3xl"
        variants={headingVariants}
        initial={"hidden"}
        animate={"visible"}
        transition={
          {
            // delay: 0.5,
          }
        }
      >
        Aaron Yarborough
      </motion.h1>
      <motion.p
        className="font-semibold text-xl text-yd-orange"
        variants={headingVariants}
        initial={"hidden"}
        animate={"visible"}
        transition={{
          delay: 0.3,
        }}
      >
        Software Consultant
      </motion.p>
      <div className="max-w-[418px] text-center mt-[40px]">
        <TypedTextAnimation
          text={"With over a decade of expertise, I transform businesses and their clients into digital success stories by crafting elegant, efficient, and cost-effective web and mobile solutions."}
          animationVariant={{
            transition: {
              delayChildren: 0.5,
              staggerChildren: 0.005,
            },
          }}
        />
      </div>
      <HireMeButton />
    </header>
  );
}
function ServicesSection(): JSX.Element {
  return (
    <div className="mb-[200px] container px-[125px]">
      <div className="px-[125px] pt-[104px] container faded-bg rounded-[50px]">
        <motion.h2 id="services" className="text-[43.95px] font-semibold text-yd-orange" variants={introVariants} initial={"hidden"} whileInView={"visible"} viewport={{ once: true }}>
          Services I offer
        </motion.h2>
        <div className="flex flex-row gap-x-[77px] items-stretch">
          <div className="w-[50%] flex flex-col justify-between">
            <div className="mx-[50px] leading-[30px] mt-[40px]">
              <TypedTextAnimation text="Dive into a decade of software experience with a seasoned freelance engineer. Crafting robust solutions since 2010. Let's turn your ideas into digital marvels together. Explore my services to find out what I can offer!" />
            </div>
            <Image
              src={aaron}
              alt="Headshot of Aaron"
              className="-mt-[150px] pointer-events-none"
              style={{
                objectFit: "cover",
              }}
            />
          </div>

          <div className="w-[50%] relative flex flex-col gap-y-[46px] justify-start mt-[40px] mb-[80px]">
            <ServiceCard
              imageSrc={thumbBespokeDev}
              imageAlt="a person sitting in front of a computer"
              title={<>Bespoke Software Development</>}
              description={
                <>
                  Turning ideas into reality is my passion. With a decade of experience, I guide projects from concept to reality, whether it&apos;s building <strong>websites, web applications, or mobile apps</strong>. Need a seasoned developer to bolster your efforts? I&apos;m here for <strong>spec-writing, prototyping, design, development, and ongoing support.</strong> Let&apos;s build something shiny and new together!
                </>
              }
            />

            <ServiceCard
              imageSrc={thumbHosting}
              imageAlt="a collection of computer wires"
              title={<>Hosting, Support & Ongoing Maintenance</>}
              description={
                <>
                  From small-scale sites to large-scale platforms, I bring experience to enhance your site&apos;s accessibility up to <strong>WCAG AAA standards</strong>. Whether you need a <strong>comprehensive audit</strong> of existing issues or a <strong>complete accessibility makeover,</strong> I&apos;ve got you covered.
                </>
              }
            />

            <ServiceCard
              imageSrc={thumbAccessibility}
              imageAlt="a suited man writing notes at a desk"
              title={<>Accessibility Audits & Improvements</>}
              description={
                <>
                  Whether it&apos;s providing dedicated support for something we&apos;ve created or taking on the care of an established product, we&apos;ve got your back. We offer <strong>ongoing maintenance services</strong>, including <strong>server patching, updates, security reviews, and 24/7 uptime monitoring</strong>. Plus, our hosting options are cost-effective, scalable, and eco-friendly, with servers <strong>powered entirely by renewable energy.</strong>
                </>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkSection(): JSX.Element {
  return (
    <div id="work" className="my-[300px] container relative">
      <Image src={blobOrange} alt="" className="absolute right-[150px] -top-[150px] -z-10" />
      <Image src={blobBlue} alt="" className="absolute left-[50px] -bottom-[150px] -z-10" />

      <div className="max-w-[70%] mx-auto relative">
        <WorkSlider>
          <WorkImage imageSrc={workFFF} imageAlt="Fifty Five and Five's site redesign, showing a blog page titled how to boost your b2b marketing during a recession." />
          <WorkImage imageSrc={workSportank} imageAlt="Sportank's homepage, showing a collection widgets that offer sign up functionality, as well as fixtures, leagues, and news items." />
          <WorkImage imageSrc={workRehomeDog} imageAlt="NSF Group's sign-in page." />
          <WorkImage imageSrc={workNSFGroup} imageAlt="Newcastle Dog and Cat shelter's re-home a dog page." />
        </WorkSlider>

        <Image src={arrowRecentWork} alt="Arrow with caption 'check out my recent work'" className="absolute -right-[50px] -bottom-[250px] pointer-events-none" width={303} height={293} />
      </div>
    </div>
  );
}

function ClientsSection(): JSX.Element {
  const variants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const item: Variants = {
    hidden: {
      opacity: 0,
      y: "-50px",
      scale: 0,
    },
    visible: {
      opacity: 1,
      y: "0px",
      scale: 1,
    },
  };

  return (
    <div className="mt-[500px] mb-[200px] container relative">
      <Image src={arrowHappyClients} alt="Arrow with caption 'check out my recent work'" className="absolute left-[550px] -top-[200px] pointer-events-none" width={303} height={293} />

      <motion.div className="grid grid-cols-4 gap-x-[50px] items-center px-[10%]" variants={variants} initial={"hidden"} whileInView={"visible"} viewport={{ once: true }}>
        <motion.div className="flex flex-row items-center justify-center" variants={item}>
          <Image src={clientSportank} alt="sportank logo" width={328} height={38.11}></Image>
        </motion.div>
        <motion.div className="flex flex-row items-center justify-center" variants={item}>
          <Image src={clientAverbis} alt="averbis GmbH logo" width={200} height={66}></Image>
        </motion.div>
        <motion.div className="flex flex-row items-center justify-center" variants={item}>
          <Image src={clientHippo} alt="hippo digital logo" width={192.13} height={57.39}></Image>
        </motion.div>

        <motion.div className="flex flex-row items-center justify-center" variants={item}>
          <Image src={clientFFF} alt="Fifty Five and Five logo" width={301} height={45}></Image>
        </motion.div>
      </motion.div>
    </div>
  );
}

function ReviewsSection(): JSX.Element {
  return (
    <div id="testimonials" className="my-[200px] container relative flex flex-col max-w-[998px] items-center">
      <motion.h2
        className="text-3xl text-yd-orange font-semibold text-center max-w-[627px]"
        variants={introVariants}
        initial={"hidden"}
        whileInView={"visible"}
        transition={{
          delay: 0.5,
        }}
        viewport={{ once: true }}
      >
        What those I&apos;ve worked with have to say...
      </motion.h2>
      <motion.div className="mt-[60px] max-w-[900px] w-full overflow-hidden" variants={introVariants} initial={"hidden"} whileInView={"visible"} viewport={{ once: true }}>
        <TestimonialSlider>
          <Testimonial author="Dan Dalton" authorImageSrc={testDanD} position="Head of Product @ Flock" body="Aaron is a passionate, driven and exceptionally talented individual. Not only in his ability as a developer, but in his leadership, accountability and focus. I had the pleasure of woking with Aaron across several projects in our time at Orange Bus. In this time Aaron proved to be a invaluable part of each project team he operated in, from mobile app builds to re-platforming initiatives. Never shying from a challenge, persisting through often pressurised and difficult circumstance and motivating others to follow his example." />
          <Testimonial author="Phil Smith" authorImageSrc={testPhilS} position="CTO @ NorthLink Digital" body="Aaron is by far one of the most talented and passionate developers I know. Even at the start of his career he had continually outperformed developers many years his senior, and once I had moved away from the company we were both working at, I had to take him with me! Very outgoing & outspoken, able to take a joke, always up for a laugh, and forever working hard to be the best developer possible." />
          <Testimonial author="Torsten Koller" authorImageSrc={testAverbis} position="Developer @ Averbis GmbH" body="Within our expected timeline, Aaron was successfully able to provide us with a working prototype of our desired application. We perceived him as reliable and diligent and would be happy to work with him again in a future project." />
          <Testimonial author="Mert Özgül" authorImageSrc={testMert} position="English Language Teacher" body="I hired Aaron to help build our company's image through our website. He has done an immaculate job. He is very easy to work with and cooperative. It was an amazing experience." />
        </TestimonialSlider>
      </motion.div>
    </div>
  );
}
