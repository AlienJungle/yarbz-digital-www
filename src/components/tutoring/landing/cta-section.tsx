import bgWave from "@/../public/tutoring/bg-wave@2x.png";
import { hoverVariant, introBurstIn, tapVariant } from "@/lib/animations";
import * as motion from "@/lib/motion";
import { statics } from "@/static";
import classNames from "classnames";
import Image from "next/image";
import { THEME_CLASSNAME_GREEN } from "../button";

export default function CTASection() {
  return (
    <motion.div className="landing-section" initial="hidden" whileInView={"visible"} variants={introBurstIn} viewport={{ once: true }}>
      <div className="bg-yd-tut-black rounded-[15px] p-[25px] lg:p-[42px] flex flex-col items-center justify-center overflow-hidden relative">
        <Image src={bgWave} className="absolute left-0 bottom-0 w-full pointer-events-none" height={95} alt="" />

        <h2 className="text-2xl lg:text-3xl text-yd-tut-white text-center lg:text-left">Ready to get started?</h2>
        <p className="my-[20px] lg:my-[30px] text-yd-tut-white text-center lg:text-left">Book a free trial session and kick-start your learning journey!</p>
        <motion.a whileTap={tapVariant} whileHover={hoverVariant} href={statics.trialLessonBookingURL} target="_blank" rel="nofollow noopener" className={classNames("btn-tut lg:mb-[40px] inline-block mb-[15px]", THEME_CLASSNAME_GREEN)}>
          Book a trial lesson
        </motion.a>
      </div>
    </motion.div>
  );
}
