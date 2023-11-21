"use client";

import * as motion from "@/lib/motion";
import classNames from "classnames";
import { AnimatePresence, Variants } from "framer-motion";
import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";

interface SliderProps extends PropsWithChildren {
  sliderClassName?: string;
  pageClassName?: string;
}

export default function Slider({
  children,
  sliderClassName,
  pageClassName,
}: SliderProps) {
  const [sliderIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<string | undefined>(
    undefined,
  );

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      updateSliderIndex(sliderIndex - 1);
    },
    onSwipedRight: () => {
      updateSliderIndex(sliderIndex + 1);
    },
  });

  const childrenArray = Array(children)[0] as ReactNode[];

  useEffect(() => {}, [childrenArray.length, sliderIndex]);

  const updateSliderIndex = (newIndex: number) => {
    if (newIndex > childrenArray.length - 1) {
      setCurrentIndex(0);
      setSlideDirection("right");
    } else if (newIndex < 0) {
      setCurrentIndex(childrenArray.length - 1);
      setSlideDirection("left");
    } else {
      setCurrentIndex(newIndex);
      setSlideDirection(newIndex > sliderIndex ? "right" : "left");
    }
  };

  const pageVariants: Variants = {
    hover: {
      scale: 1.2,
    },
    inactive: {},
    active: {
      background: "var(--yd-orange)",
    },
  };

  const slideVariants: Variants = {
    hiddenRight: {
      x: "100%",
      opacity: 0,
    },
    hiddenLeft: {
      x: "-100%",
      opacity: 0,
    },
    visible: {
      x: "0",
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      position: "absolute",

      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="carousel">
      <div className="carousel-content relative">
        <AnimatePresence>
          <motion.div
            key={sliderIndex}
            className={classNames(sliderClassName, "overflow-hidden")}
            variants={slideVariants}
            animate="visible"
            exit="exit"
            initial={slideDirection === "right" ? "hiddenRight" : "hiddenLeft"}
            {...swipeHandlers}
          >
            {childrenArray[sliderIndex]}
          </motion.div>
        </AnimatePresence>

        <div className="flex-row justify-between absolute top-1/2 left-0 w-full -translate-y-1/2 flex">
          <button
            className="slider-btn slider-btn-left"
            onClick={() => updateSliderIndex(sliderIndex - 1)}
          >
            {"<"}
          </button>
          <button
            className="slider-btn slider-btn-right"
            onClick={() => updateSliderIndex(sliderIndex + 1)}
          >
            {">"}
          </button>
        </div>
      </div>

      <div className="carousel-pages flex flex-row gap-x-5 justify-center my-6">
        {childrenArray.map((_, i) => (
          <motion.div
            key={i}
            className={classNames("slider-dot", pageClassName, {
              active: sliderIndex === i,
            })}
            variants={pageVariants}
            animate={sliderIndex === i ? "active" : "inactive"}
            whileHover={"hover"}
            onClick={() => updateSliderIndex(i)}
          ></motion.div>
        ))}
      </div>
    </div>
  );
}
