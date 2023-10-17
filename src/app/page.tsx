"use client";

import Image from "next/image";

// Images
import aaron from "../../public/aaron@2x.png";
import arrowHappyClients from "../../public/arrow-happy-clients@2x.png";
import arrowRecentWork from "../../public/arrow-recent-work@2x.png";
import bgOrangeWave from "../../public/bg-orange-wave.svg";
import bgWave from "../../public/bg-wave.png";
import blobBlue from "../../public/blob-blue.svg";
import blobOrange from "../../public/blob-orange.svg";
import clientAverbis from "../../public/client-averbis@2x.png";
import clientFFF from "../../public/client-fff@2x.png";
import clientHippo from "../../public/client-hippo@2x.png";
import clientSportank from "../../public/client-sportank@2x.png";
import testAverbis from "../../public/test-averbis.webp";
import testDanD from "../../public/test-dan-d.jpg";
import testMert from "../../public/test-mert.webp";
import testPhilS from "../../public/test-phil-s.jpg";
import thumbAccessibility from "../../public/thumb-accessibility.png";
import thumbBespokeDev from "../../public/thumb-bespoke-dev.png";
import thumbHosting from "../../public/thumb-hosting.png";
import workFFF from "../../public/work-fff.png";
import workNSFGroup from "../../public/work-nsfgroup.png";
import workSportank from "../../public/work-sportank.png";

import { hoverVariant, tapVariant } from "@/animations";
import RebrandBanner from "@/components/rebrand-banner";
import ServiceCard from "@/components/service-card";
import Testimonial from "@/components/testimonial";
import TestimonialSlider from "@/components/testimonial-slider";
import WorkImage from "@/components/work-image";
import WorkSlider from "@/components/work-slider";
import { statics } from "@/static";
import { Variants, motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";

export default function Home({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
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

  const headingCaption = "With over a decade of expertise, I transform businesses and their clients into digital success stories by crafting elegant, efficient, and cost-effective web and mobile solutions.";

  const captionVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: 1,
        staggerChildren: 0.005,
      },
    },
  };

  const captionCharacterVariants: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };

  const hireMeVariants: Variants = {
    hidden: {
      y: "20px",
      opacity: 0,
    },
    visible: {
      y: "0px",
      opacity: 1,
      transition: {
        delay: 2.1,
        // duration: 1,
      },
    },
  };

  // Using useAnimationControls() to work around motion bug
  // where setting duration/delay messes up animation after
  // leaving the whenHover={} or whenTap={} state
  const hireMeControls = useAnimationControls();

  useEffect(() => {
    hireMeControls.start("visible");
  }, [hireMeControls]);

  return (
    <>
      {searchParams.rebrandNotice === "true" && <RebrandBanner />}
      <main>
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
            transition={{
              delay: 0.5,
            }}
          >
            Aaron Yarborough
          </motion.h1>
          <motion.p
            className="font-semibold text-xl text-yd-orange"
            variants={headingVariants}
            initial={"hidden"}
            animate={"visible"}
            transition={{
              delay: 0.8,
            }}
          >
            Software Consultant
          </motion.p>
          <motion.p className="max-w-[418px] text-center mt-[40px]" variants={captionVariants} initial={"hidden"} animate={"visible"}>
            {headingCaption.split("").map((char, i) => (
              <motion.span key={i} variants={captionCharacterVariants}>
                {char}
              </motion.span>
            ))}
          </motion.p>
          <motion.a href={statics.bookingURL} target="_blank" rel="nofollow noopener" className="btn bg-yd-dark-blue text-yd-white mt-[50px] !px-[30px]" variants={hireMeVariants} initial={"hidden"} animate={hireMeControls} whileTap={tapVariant} whileHover={hoverVariant}>
            Hire me!
          </motion.a>
        </header>

        <div className="mb-[200px] container px-[125px]">
          <div className="px-[125px] pt-[104px] container faded-bg rounded-[50px]">
            <h2 id="services" className="text-[43.95px] font-semibold text-yd-orange">
              Services I offer
            </h2>
            <div className="flex flex-row gap-x-[77px] items-stretch">
              <div className="w-[50%] flex flex-col justify-between">
                <p className="mx-[50px] leading-[30px] mt-[40px]">Dive into a decade of software experience with a seasoned freelance engineer. Crafting robust solutions since 2010. Let&apos;s turn your ideas into digital marvels together. Explore my services to find out what I can offer!</p>
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

        <div id="work" className="my-[300px] container relative">
          <Image src={blobOrange} alt="" className="absolute right-[150px] -top-[150px] -z-10" />
          <Image src={blobBlue} alt="" className="absolute left-[50px] -bottom-[150px] -z-10" />

          <div className="max-w-[70%] mx-auto relative">
            <WorkSlider>
              <WorkImage imageSrc={workFFF} imageAlt="" />
              <WorkImage imageSrc={workSportank} imageAlt="" />
              <WorkImage imageSrc={workNSFGroup} imageAlt="" />
            </WorkSlider>

            <Image src={arrowRecentWork} alt="Arrow with caption 'check out my recent work'" className="absolute -right-[250px] -bottom-[150px] pointer-events-none" width={303} height={293} />
          </div>
        </div>

        <div className="mt-[500px] mb-[200px] container relative">
          <Image src={arrowHappyClients} alt="Arrow with caption 'check out my recent work'" className="absolute left-[550px] -top-[200px] pointer-events-none" width={303} height={293} />

          <div className="grid grid-cols-4 gap-x-[50px] items-center px-[10%]">
            <motion.div className="flex flex-row items-center justify-center" whileHover={hoverVariant}>
              <Image src={clientSportank} alt="sportank logo" width={328} height={38.11}></Image>
            </motion.div>
            <motion.div className="flex flex-row items-center justify-center" whileHover={hoverVariant}>
              <Image src={clientAverbis} alt="averbis GmbH logo" width={200} height={66}></Image>
            </motion.div>
            <motion.div className="flex flex-row items-center justify-center" whileHover={hoverVariant}>
              <Image src={clientHippo} alt="hippo digital logo" width={192.13} height={57.39}></Image>
            </motion.div>

            <motion.div className="flex flex-row items-center justify-center" whileHover={hoverVariant}>
              <Image src={clientFFF} alt="Fifty Five and Five logo" width={301} height={45}></Image>
            </motion.div>
          </div>
        </div>

        <div className=" my-[200px] container relative flex flex-col max-w-[998px] items-center">
          <h2 className="text-3xl text-yd-orange font-semibold text-center max-w-[627px]">What those I&apos;ve worked with have to say...</h2>
          <div className="mt-[60px] max-w-[900px] w-full overflow-hidden">
            <TestimonialSlider>
              <Testimonial author="Dan Dalton" authorImageSrc={testDanD} position="Head of Product @ Flock" body="Aaron is a passionate, driven and exceptionally talented individual. Not only in his ability as a developer, but in his leadership, accountability and focus. I had the pleasure of woking with Aaron across several projects in our time at Orange Bus. In this time Aaron proved to be a invaluable part of each project team he operated in, from mobile app builds to re-platforming initiatives. Never shying from a challenge, persisting through often pressurised and difficult circumstance and motivating others to follow his example." />
              <Testimonial author="Phil Smith" authorImageSrc={testPhilS} position="CTO @ NorthLink Digital" body="Aaron is by far one of the most talented and passionate developers I know. Even at the start of his career he had continually outperformed developers many years his senior, and once I had moved away from the company we were both working at, I had to take him with me! Very outgoing & outspoken, able to take a joke, always up for a laugh, and forever working hard to be the best developer possible." />
              <Testimonial author="Torsten Koller" authorImageSrc={testAverbis} position="Developer @ Averbis GmbH" body="Within our expected timeline, Aaron was successfully able to provide us with a working prototype of our desired application. We perceived him as reliable and diligent and would be happy to work with him again in a future project." />
              <Testimonial author="Mert Özgül" authorImageSrc={testMert} position="English Language Teacher" body="I hired Aaron to help build our company's image through our website. He has done an immaculate job. He is very easy to work with and cooperative. It was an amazing experience." />
            </TestimonialSlider>
          </div>
        </div>

        <div className="my-[200px] container relative">
          <div className="max-w-[1012px] p-[54px] flex flex-col items-center justify-center mx-auto bg-yd-light-grey rounded-2xl relative overflow-hidden">
            <Image src={bgOrangeWave} alt="" className="absolute bottom-0 pointer-events-none min-w-[1104px]" />
            <h2 className="text-2xl font-semibold text-yd-dark-blue">Ready to take it to the next level?</h2>
            <p className="mt-[29px] mb-[48px] max-w-[578px]">Book a free call with me to get started. If you&apos;d rather, you can contact me by email at aaron AT alienjungle DOT digital.</p>
            <motion.a href={statics.bookingURL} className="btn text-yd-white bg-yd-dark-blue" target="_blank" rel="nofollow noopener" whileHover={hoverVariant} whileTap={tapVariant}>
              Get in touch
            </motion.a>
          </div>
        </div>
      </main>
    </>
  );
}
