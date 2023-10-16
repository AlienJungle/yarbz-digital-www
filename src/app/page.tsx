import Image from "next/image";

// Images
import aaron from "../../public/aaron@2x.png";
import arrowHappyClients from "../../public/arrow-happy-clients@2x.png";
import arrowRecentWork from "../../public/arrow-recent-work@2x.png";
import bgWave from "../../public/bg-wave.png";
import blobBlue from "../../public/blob-blue.svg";
import blobOrange from "../../public/blob-orange.svg";
import clientAverbis from "../../public/client-averbis@2x.png";
import clientFFF from "../../public/client-fff@2x.png";
import clientHippo from "../../public/client-hippo@2x.png";
import clientSportank from "../../public/client-sportank@2x.png";
import thumbAccessibility from "../../public/thumb-accessibility.png";
import thumbBespokeDev from "../../public/thumb-bespoke-dev.png";
import thumbHosting from "../../public/thumb-hosting.png";
import workFFF from "../../public/work-fff.png";
import workNSFGroup from "../../public/work-nsfgroup.png";
import workSportank from "../../public/work-sportank.png";
import bgOrangeWave from "../../public/bg-orange-wave.svg";

import RebrandBanner from "@/components/rebrand-banner";
import ServiceCard from "@/components/service-card";
import WorkImage from "@/components/work-image";
import WorkSlider from "@/components/work-slider";

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
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
          <h1 className="font-semibold text-3xl">Aaron Yarborough</h1>
          <p className="font-semibold text-xl text-yd-orange">
            Software Consultant
          </p>
          <p className="max-w-[418px] text-center mt-[40px]">
            With over a decade of expertise, I transform businesses and their
            clients into digital success stories by crafting elegant, efficient,
            and cost-effective web and mobile solutions.
          </p>
          <a
            href="#"
            className="btn bg-yd-dark-blue text-yd-white mt-[50px] !px-[30px]"
          >
            Hire me!
          </a>
        </header>

        <div className="mb-[280px] container px-[125px]">
          <div className="px-[125px] pt-[104px] container faded-bg rounded-[50px]">
            <h2 className="text-[43.95px] font-semibold text-yd-orange">
              Services I offer
            </h2>
            <div className="flex flex-row gap-x-[77px] items-stretch">
              <div className="w-[50%] flex flex-col justify-between">
                <p className="mx-[50px] leading-[30px] mt-[40px]">
                  Dive into a decade of software experience with a seasoned
                  freelance engineer. Crafting robust solutions since 2010.
                  Let&apos;s turn your ideas into digital marvels together.
                  Explore my services to find out what I can offer!
                </p>
                <Image
                  src={aaron}
                  alt="Headshot of Aaron"
                  className="-mt-[150px] pointer-events-none"
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>

              <div className="w-[50%] relative flex flex-col gap-y-[46px] justify-center my-[50px]">
                <ServiceCard
                  imageSrc={thumbBespokeDev}
                  imageAlt="a person sitting in front of a computer"
                  title={<>Bespoke Software Development</>}
                  description={
                    <>
                      Turning ideas into reality is my passion. With a decade of
                      experience, I guide projects from concept to reality,
                      whether it&apos;s building{" "}
                      <strong>
                        websites, web applications, or mobile apps
                      </strong>
                      . Need a seasoned developer to bolster your efforts?
                      I&apos;m here for{" "}
                      <strong>
                        spec-writing, prototyping, design, development, and
                        ongoing support.
                      </strong>{" "}
                      Let&apos;s build something shiny and new together!
                    </>
                  }
                />

                <ServiceCard
                  imageSrc={thumbHosting}
                  imageAlt="a collection of computer wires"
                  title={<>Hosting, Support & Ongoing Maintenance</>}
                  description={
                    <>
                      From small-scale sites to large-scale platforms, I bring
                      experience to enhance your site&apos;s accessibility up to{" "}
                      <strong>WCAG AAA standards</strong>. Whether you need a{" "}
                      <strong>comprehensive audit</strong> of existing issues or
                      a <strong>complete accessibility makeover,</strong>{" "}
                      I&apos;ve got you covered.
                    </>
                  }
                />

                <ServiceCard
                  imageSrc={thumbAccessibility}
                  imageAlt="a suited man writing notes at a desk"
                  title={<>Accessibility Audits & Improvements</>}
                  description={
                    <>
                      Whether it&apos;s providing dedicated support for
                      something we&apos;ve created or taking on the care of an
                      established product, we&apos;ve got your back. We offer{" "}
                      <strong>ongoing maintenance services</strong>, including{" "}
                      <strong>
                        server patching, updates, security reviews, and 24/7
                        uptime monitoring
                      </strong>
                      . Plus, our hosting options are cost-effective, scalable,
                      and eco-friendly, with servers{" "}
                      <strong>powered entirely by renewable energy.</strong>
                    </>
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="my-[400px] container relative">
          <Image
            src={blobOrange}
            alt=""
            className="absolute right-[150px] -top-[150px] -z-10"
          />
          <Image
            src={blobBlue}
            alt=""
            className="absolute left-[50px] -bottom-[150px] -z-10"
          />

          <div className="max-w-[70%] mx-auto relative">
            <WorkSlider>
              <WorkImage imageSrc={workFFF} imageAlt="" />
              <WorkImage imageSrc={workSportank} imageAlt="" />
              <WorkImage imageSrc={workNSFGroup} imageAlt="" />
            </WorkSlider>

            <Image
              src={arrowRecentWork}
              alt="Arrow with caption 'check out my recent work'"
              className="absolute -right-[250px] -bottom-[150px] pointer-events-none"
              width={303}
              height={293}
            />
          </div>
        </div>

        <div className="my-[200px] container relative">
          <Image
            src={arrowHappyClients}
            alt="Arrow with caption 'check out my recent work'"
            className="absolute left-[550px] -top-[200px] pointer-events-none"
            width={303}
            height={293}
          />

          <div className="grid grid-cols-4 gap-x-[50px] items-center px-[10%]">
            <div className="flex flex-row items-center justify-center">
              <Image
                src={clientSportank}
                alt="sportank logo"
                width={328}
                height={38.11}
              ></Image>
            </div>
            <div className="flex flex-row items-center justify-center">
              <Image
                src={clientAverbis}
                alt="averbis GmbH logo"
                width={200}
                height={66}
              ></Image>
            </div>
            <div className="flex flex-row items-center justify-center">
              <Image
                src={clientHippo}
                alt="hippo digital logo"
                width={192.13}
                height={57.39}
              ></Image>
            </div>

            <div className="flex flex-row items-center justify-center">
              <Image
                src={clientFFF}
                alt="Fifty Five and Five logo"
                width={301}
                height={45}
              ></Image>
            </div>
          </div>
        </div>

        <div className="my-[200px] container relative flex flex-col max-w-[998px] items-center">
          <h2 className="text-3xl text-yd-orange font-semibold text-center max-w-[627px]">
            What those I&apos;ve worked with have to say...
          </h2>
          <p className="my-[60px]">[reviews]</p>
        </div>

        <div className="my-[300px] container relative">
          <div className="max-w-[1012px] p-[54px] flex flex-col items-center justify-center mx-auto bg-yd-light-grey rounded-2xl relative overflow-hidden">
            <Image
              src={bgOrangeWave}
              alt=""
              className="absolute bottom-0 pointer-events-none min-w-[1104px]"
            />
            <h2 className="text-2xl font-semibold text-yd-dark-blue">
              Ready to take it to the next level?
            </h2>
            <p className="mt-[29px] mb-[48px] max-w-[578px]">
              Book a free call with me to get started. If you&apos;d rather, you
              can contact me by email at aaron AT alienjungle DOT digital.
            </p>
            <a href="#" className="btn text-yd-white bg-yd-dark-blue">
              Get in touch
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
