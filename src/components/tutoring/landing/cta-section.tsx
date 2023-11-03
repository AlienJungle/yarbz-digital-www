import bgWave from "@/../public/tutoring/bg-wave@2x.png";
import { statics } from "@/static";
import classNames from "classnames";
import Image from "next/image";
import { THEME_CLASSNAME_GREEN } from "../button";

export default function CTASection() {
  return (
    <div className="my-32">
      <div className="bg-yd-tut-black rounded-[15px] p-[42px] flex flex-col items-center justify-center overflow-hidden relative">
        <Image src={bgWave} className="absolute left-0 bottom-0 w-full pointer-events-none" height={95} alt="" />

        <h2 className="text-3xl font-semibold text-yd-tut-white leading-[64px]">Ready to get started?</h2>
        <p className="my-[30px] text-yd-tut-white">Book a free trial session and kick-start your learning journey!</p>
        <a href={statics.trialLessonBookingURL} target="_blank" rel="nofollow noopener" className={classNames("btn-tut mb-[40px]", THEME_CLASSNAME_GREEN)}>
          Book a trial lesson
        </a>
      </div>
    </div>
  );
}
