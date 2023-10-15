"use client";

import Image, { StaticImageData } from "next/image";

// Images
import bgWave from "../../public/bg-wave.png";
import aaron from "../../public/aaron@2x.png";
import thumbBespokeDev from "../../public/thumb-bespoke-dev.png";
import thumbHosting from "../../public/thumb-hosting.png";
import thumbAccessibility from "../../public/thumb-accessibility.png";
import workFFF from "../../public/work-fff.png";
import workSportank from "../../public/work-sportank.png";
import workNSFGroup from "../../public/work-nsfgroup.png";
import blobOrange from "../../public/blob-orange.svg";
import blobBlue from "../../public/blob-blue.svg";

import Flickity from "react-flickity-component";
import { useRouter, useSearchParams } from "next/navigation";
import RebrandBanner from "@/components/rebrand-banner";

export default function Home() {
  const showRebrandBanner = useSearchParams().get("rebrandNotice") === "true";

  return (
    <>
      {showRebrandBanner && <RebrandBanner />}
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

        <div className="my-[280px] container px-[125px]">
          <div className="px-[125px] pt-[104px] container faded-bg rounded-[50px]">
            <h2 className="text-[43.95px] font-semibold text-yd-orange">
              Services I offer
            </h2>
            <div className="flex flex-row gap-x-[77px] items-center">
              <div className="w-[50%] relative">
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

              <div className="w-[50%] relative flex flex-col gap-y-[46px]">
                <ServiceCard
                  imageSrc={thumbBespokeDev}
                  imageAlt="a person sitting in front of a computer"
                  title={<>Bespoke Software Development</>}
                  description={<></>}
                />

                <ServiceCard
                  imageSrc={thumbHosting}
                  imageAlt="a collection of computer wires"
                  title={<>Hosting, Support & Ongoing Maintenance</>}
                  description={<></>}
                />

                <ServiceCard
                  imageSrc={thumbAccessibility}
                  imageAlt="a suited man writing notes at a desk"
                  title={<>Accessibility Audits & Improvements</>}
                  description={<></>}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="my-[272px] container relative">
          <Image
            src={blobOrange}
            alt=""
            className="absolute right-[150px] -top-[150px] -z-10"
          />
          <Image
            src={blobBlue}
            alt=""
            className="absolute left-[150px] -bottom-[150px] -z-10"
          />
          <WorkSlider />
        </div>
      </main>
    </>
  );
}

interface ServiceCardProps {
  imageSrc: StaticImageData;
  imageAlt: string;
  title: JSX.Element;
  description: JSX.Element;
}

function ServiceCard({
  imageSrc,
  imageAlt,
  title,
  description,
}: ServiceCardProps) {
  return (
    <div className="bg-[#1C1C4F] p-[25px] rounded-[20px] flex flex-row items-center gap-x-[32px] drop-shadow-md border-yd-dark-blue">
      <Image
        src={imageSrc}
        className="rounded-[20px] flex-shrink-0"
        alt={imageAlt}
        height={115}
        width={115}
      />
      <p className="text-yd-white font-semibold text-[22.5px] pr-[20px]">
        {title}
      </p>
    </div>
  );
}

interface WorkImageProps {
  imageSrc: StaticImageData;
  imageAlt: string;
}

function WorkSlider(): JSX.Element {
  "use client";

  return (
    <div className="max-w-[1022px] mx-auto overflow-x-hidden">
      <Flickity
        elementType={"div"}
        className="w-full"
        options={{
          wrapAround: true,
          autoPlay: 2500,
          pauseAutoPlayOnHover: true,
          pageDots: true,
          prevNextButtons: true,
          cellAlign: "left",
        }}
      >
        <WorkImage imageSrc={workFFF} imageAlt="" />
        <WorkImage imageSrc={workSportank} imageAlt="" />
        <WorkImage imageSrc={workNSFGroup} imageAlt="" />
      </Flickity>
    </div>
  );
}

function WorkImage({ imageSrc, imageAlt }: WorkImageProps) {
  return (
    <Image
      src={imageSrc}
      alt={imageAlt}
      className="rounded-[40px] mx-[30px]"
      loading="eager"
    />
  );
}
