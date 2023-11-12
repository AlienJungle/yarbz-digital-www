import Image, { StaticImageData } from "next/image";

import iconThumb from "@/../public/tutoring/icon-thumb.svg";
import iconTie from "@/../public/tutoring/icon-tie.svg";
import iconTutoring from "@/../public/tutoring/icon-tutoring.svg";

import TypedTextAnimation from "@/components/animation/typed-text-animation";

import { introBurstIn } from "@/lib/animations";
import * as motion from "@/lib/motion";

export default function ServicesSection() {
  const cards: {
    imageSrc: StaticImageData;
    title: string;
    description: string;
  }[] = [
    {
      imageSrc: iconTutoring,
      title: "Beginner 2 Advanced tutoring",
      description:
        "For those interesting in learning modern software development from the ground up!",
    },
    {
      imageSrc: iconThumb,
      title: "Code review & feedback",
      description:
        "Send me your code, and receive an expert code review with live feedback over a call.",
    },
    {
      imageSrc: iconTie,
      title: "Interview prep. and practice",
      description:
        "Prepare for your big interview the right way by letting me share my experience in both interviewing and hiring.",
    },
  ];

  const reviewParentsVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="landing-section" id="services">
      <h1 className="max-w-[381px]">
        <TypedTextAnimation text="What can I help with?" />
      </h1>
      <motion.div
        variants={reviewParentsVariants}
        viewport={{ once: true }}
        initial="hidden"
        whileInView="visible"
        className="mt-[52px] lg:mt-[90px] grid lg:grid-cols-3 gap-x-[77px] gap-y-[70px] lg:gap-y-[80px]"
      >
        {cards.map((card) => (
          <motion.div
            key={card.title}
            className="rounded-[8px] bg-yd-tut-lightgreen p-[32px] relative shadow-yd-default"
            variants={introBurstIn}
          >
            <div className="absolute w-[65px] h-[65px] left-[32px] top-0 -translate-y-1/2 flex justify-center items-center bg-yd-tut-green rounded-[5px]">
              <Image src={card.imageSrc} alt="" width={40} />
            </div>

            <h2 className="text-lg font-semibold mt-[32px] mb-[19px]">
              {card.title}
            </h2>
            <p>{card.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
