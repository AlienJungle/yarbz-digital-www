import arrow from "@/../public/tutoring/arrow.svg";
import TypedTextAnimation from "@/components/animation/typed-text-animation";
import { introBurstIn } from "@/lib/animations";
import * as motion from "@/lib/motion";
import Image from "next/image";

export default function HowItWorksSection() {
  return (
    <div className="landing-section">
      <h2 className=" mb-[52px] lg:mb-[62px]">
        <TypedTextAnimation text="How it works" />
      </h2>

      <motion.div
        className="flex flex-col lg:flex-row gap-x-[66px] items-center w-full md:w-auto"
        initial="hidden"
        whileInView={"visible"}
        viewport={{ once: true }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        <motion.div className="hiw-section" variants={introBurstIn}>
          <p className="hiw-step">Step 1</p>
          <h3 className="">Buy lessons or start a subscription</h3>
        </motion.div>

        <motion.div className="hiw-section" variants={introBurstIn}>
          <Image src={arrow} alt="" className="hiw-arrow" width={150} />
        </motion.div>

        <motion.div className="hiw-section" variants={introBurstIn}>
          <p className="hiw-step">Step 2</p>
          <h3 className="">Book your sessions into my calendar</h3>
        </motion.div>

        <motion.div className="hiw-section" variants={introBurstIn}>
          <Image src={arrow} alt="" className="hiw-arrow" width={150} />
        </motion.div>

        <motion.div className="hiw-section" variants={introBurstIn}>
          <p className="hiw-step">Step 3</p>
          <h3 className="">Attend the session and learn!</h3>
        </motion.div>
      </motion.div>
    </div>
  );
}
