"use client";

import { Variants, motion, useAnimation } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";

interface ServiceCardProps {
  imageSrc: StaticImageData;
  imageAlt: string;
  title: JSX.Element;
  description: JSX.Element;
}

export default function ServiceCard({ imageSrc, imageAlt, title, description }: ServiceCardProps) {
  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: "-50px",
    },
    visible: {
      opacity: 1,
      y: "0px",
    },
    inactive: {
      background: "rgba(0,0,0,0)",
    },
    active: {
      border: "2px solid rgba(0,0,0,0)",
      color: "var(--yd-white)",
      background: "var(--yd-dark-blue)",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const textVariants: Variants = {
    inactive: {
      opacity: 0,
      maxHeight: 0,
    },
    active: {
      maxHeight: 900,
      paddingTop: 25,
      paddingBottom: 25,
      borderTop: "2px solid var(--yd-orange)",
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const cardAnimation = useAnimation();

  useEffect(() => {
    cardAnimation.start({
      opacity: 0.2,
    });
  }, [cardAnimation]);

  const contRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(false);

  const handleContainerClick = (e: React.MouseEvent<HTMLElement>) => {
    setActive(!active);
  };

  return (
    <motion.div className="service-card rounded-xl border-2 group cursor-pointer shadow-yd-default" variants={cardVariants} initial={"inactive"} animate={active ? "active" : "inactive"} whileInView={"visible"} ref={contRef} onClick={handleContainerClick}>
      <div className="p-[20px] lg:p-[25px] flex flex-row items-center gap-x-[32px]">
        <Image src={imageSrc} className="flex-shrink-0 w-[75px] h-[75px] lg:w-[115px] lg:h-[115px]" alt={imageAlt} height={115} width={115} />
        <p className="font-semibold text-lg pr-[20px]">{title}</p>
      </div>
      <motion.p className="px-[25px] overflow-hidden relative" variants={textVariants}>
        {description}
      </motion.p>
    </motion.div>
  );
}
