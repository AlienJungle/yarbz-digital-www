import check from "@/../public/tutoring/check.svg";
import pairProgramming from "@/../public/tutoring/pair-programming@2x.jpg";
import * as motion from "@/lib/motion";

import { introBurstIn, introSlideInFromRight } from "@/lib/animations";
import Image from "next/image";

export default function ConsiderTutoringSection() {
  const points = ["Increase your value in digital work environments by understanding the technical aspects of your product or service", "Develop valuable technical problem-solving skills ", "Open doors to new career opportunities by learning from an experienced professional who has done the hard work for you!"];

  return (
    <div className="landing-section">
      <motion.div className="flex flex-row items-center gap-x-[57px]" initial="hidden" whileInView={"visible"} viewport={{ once: true }}>
        <motion.div className="hidden lg:block" variants={introBurstIn}>
          <Image src={pairProgramming} alt="Image of a pair of programmers working together." width={601} />
        </motion.div>
        <motion.div className="lg:max-w-[473px]" variants={introSlideInFromRight}>
          <h1 className="mb-[32px] lg:mb-[13px]">Why should I consider tutoring?</h1>
          <p className="mb-[25px] leading-[30px]">Tutoring is a great way to get fast, quality advice from experts efficiently without developing bad habits or wasting your time on unnecessary things, as well as:</p>
          <div className="flex flex-col gap-y-[17px]">
            {points.map((point, i) => (
              <div key={i} className="flex flex-row gap-x-[9px] items-start">
                <Image src={check} alt="" className="mt-[6px]" />
                <p>{point}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
