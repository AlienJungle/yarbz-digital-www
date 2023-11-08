import heroshot from "@/../public/tutoring/heroshot@2x.png";
import TypedTextAnimation from "@/components/animation/typed-text-animation";
import { hoverScale, introBurstIn, introSlideInFromRight, tapScale } from "@/lib/animations";
import * as motion from "@/lib/motion";
import { statics } from "@/static";
import classNames from "classnames";
import { Variant, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { THEME_CLASSNAME_BLACK, THEME_CLASSNAME_GREEN } from "../button";

export default function HeroSection() {
  const animateButtonVariants: Variants = {
    ...introBurstIn,
    hover: hoverScale as Variant,
    tap: tapScale as Variant,
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between lg:my-32">
      <div className="lg:max-w-[553px] flex-shrink-0 relative flex flex-col items-center text-center lg:items-start lg:text-left">
        <motion.h1 className="text-3xl font-semibold leading-[64px] mb-[20px]" variants={introBurstIn} initial="hidden" animate="visible">
          Expert tutoring from a <span className="text-yd-tut-green">software professional</span>
        </motion.h1>

        <TypedTextAnimation text="I help people learn software development, no matter where they're starting from. Whether you're totally new to it, have some experience, or just need a quick intro to a new tech or some code review, I've got you covered!" className="mb-[30px]" />

        <motion.div className="flex flex-col sm:flex-row gap-[21px] items-center">
          <motion.div variants={animateButtonVariants} initial="hidden" animate="visible" whileHover="hover" whileTap="tap">
            <Link href={statics.trialLessonBookingURL} target="_blank" className={classNames("btn-tut", THEME_CLASSNAME_GREEN)}>
              Book a free trial lesson
            </Link>
          </motion.div>

          <motion.div variants={animateButtonVariants} initial="hidden" animate="visible" whileHover="hover" whileTap="tap">
            <Link href="#pricing" className={classNames("btn-tut", THEME_CLASSNAME_BLACK)}>
              Purchase sessions
            </Link>
          </motion.div>
        </motion.div>
      </div>
      <motion.div className="hidden lg:block" variants={introSlideInFromRight} initial="hidden" animate="visible">
        <Image src={heroshot} alt="Headshot of Aaron" width={515} />
      </motion.div>
    </div>
  );
}
