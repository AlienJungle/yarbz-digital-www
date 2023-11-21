import * as motion from "@/lib/motion";
import { Variants } from "framer-motion";
import Image from "next/image";
import TypedTextAnimation from "../animation/typed-text-animation";
import HireMeButton from "../hire-me-button";

import bgWave from "@/../public/bg-wave.png";

export default function HeaderSection(): JSX.Element {
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
    <header className="h-[calc(100vh-142px)] md:min-h-[700px] flex flex-col items-center relative w-full justify-center px-[20px]">
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
        className="font-semibold text-xl md:text-3xl"
        variants={headingVariants}
        initial={"hidden"}
        animate={"visible"}
      >
        Aaron Yarborough
      </motion.h1>
      <motion.p
        className="font-semibold text-lg md:text-xl text-yd-orange"
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
          text={
            "With over a decade of expertise, I transform businesses and their clients into digital success stories by crafting elegant, efficient, and cost-effective web and mobile solutions."
          }
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
