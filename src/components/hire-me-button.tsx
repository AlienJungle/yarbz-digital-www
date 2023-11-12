"use client";

import { hoverVariant, tapVariant } from "@/lib/animations";
import { statics } from "@/static";
import { Variants, motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";

export default function HireMeButton(): JSX.Element {
  const hireMeVariants: Variants = {
    hidden: {
      y: "20px",
      opacity: 0,
    },
    visible: {
      y: "0px",
      opacity: 1,
      transition: {
        delay: 1.6,
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
    <motion.a
      href={statics.bookingURL}
      target="_blank"
      rel="nofollow noopener"
      className="btn bg-yd-dark-blue text-yd-white mt-[50px] !px-[30px]"
      variants={hireMeVariants}
      initial={"hidden"}
      animate={hireMeControls}
      whileTap={tapVariant}
      whileHover={hoverVariant}
    >
      Hire me!
    </motion.a>
  );
}
