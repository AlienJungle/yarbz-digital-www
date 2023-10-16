import { Variants, motion, useAnimation } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { useEffect } from "react";

interface ServiceCardProps {
  imageSrc: StaticImageData;
  imageAlt: string;
  title: JSX.Element;
  description: JSX.Element;
}

export default function ServiceCard({
  imageSrc,
  imageAlt,
  title,
  description,
}: ServiceCardProps) {
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
      border: "2px solid var(--yd-dark-blue)",
      color: "var(--yd-white)",
      background: "var(--yd-dark-blue)",
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 170,
        damping: 20,
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
        duration: 0.5,
        type: "spring",
        stiffness: 170,
        damping: 20,
      },
    },
  };

  const cardAnimation = useAnimation();

  useEffect(() => {
    cardAnimation.start({
      opacity: 0.2,
    });
  }, [cardAnimation]);

  return (
    <motion.div
      tabIndex={0}
      className="service-card rounded-xl border-2 group"
      variants={cardVariants}
      initial={"inactive"}
      whileHover={"active"}
      whileFocus={"active"}
      whileTap={"active"}
      whileInView={"visible"}
    >
      <div className="p-[25px] flex flex-row items-center gap-x-[32px]">
        <Image
          src={imageSrc}
          className="flex-shrink-0"
          alt={imageAlt}
          height={115}
          width={115}
        />
        <p className="font-semibold text-lg pr-[20px]">{title}</p>
      </div>
      <motion.p
        className="px-[25px] overflow-hidden relative"
        variants={textVariants}
      >
        {description}
      </motion.p>
    </motion.div>
  );
}
