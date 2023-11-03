import Image from "next/image";
import Button from "../button";

import heroshot from "@/../public/tutoring/heroshot@2x.png";

export default function HeroSection() {
  return (
    <div className="flex flex-row items-center justify-between my-32">
      <div className="max-w-[553px] flex-shrink-0">
        <h1 className="text-3xl font-semibold leading-[64px] mb-[20px]">
          Expert tutoring from a <span className="text-yd-tut-green">software professional</span>
        </h1>
        <p className="leading-[30px] mb-[30px]">I help people learn software development, no matter where they&apos;re starting from. Whether you&apos;re totally new to it, have some experience, or just need a quick intro to a new tech or some code review, I&apos;ve got you covered!</p>

        <div className="flex flex-row gap-x-[21px] items-center">
          <Button theme="green">Book a free trial lesson</Button>
          <Button theme="black">Purchase sessions</Button>
        </div>
      </div>
      <div>
        <Image src={heroshot} alt="Headshot of Aaron" width={515} />
      </div>
    </div>
  );
}
