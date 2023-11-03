import arrow from "@/../public/tutoring/arrow.svg";
import Image from "next/image";

export default function HowItWorksSection() {
  return (
    <div className="my-32">
      <h1 className="text-3xl font-semibold leading-[60px] mb-[62px]">How it works</h1>

      <div className="flex flex-row gap-x-[66px] items-center">
        <div className="max-w-[260px] flex flex-col justify-between">
          <h2 className="text-lg font-semibold mb-[27px]">Step 1</h2>
          <p className="text-2xl font-semibold leading-[50px]">Buy individual lessons or start a subscription</p>
        </div>

        <Image src={arrow} alt="" />

        <div className="max-w-[260px] flex flex-col justify-between">
          <h2 className="text-lg font-semibold mb-[27px]">Step 2</h2>
          <p className="text-2xl font-semibold leading-[50px]">Book your sessions into my calendar</p>
        </div>

        <Image src={arrow} alt="" />

        <div className="max-w-[260px] flex flex-col justify-between">
          <h2 className="text-lg font-semibold mb-[27px]">Step 3</h2>
          <p className="text-2xl font-semibold leading-[50px]">Attend the session and learn!</p>
        </div>
      </div>
    </div>
  );
}
