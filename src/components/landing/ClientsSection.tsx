import arrowHappyClients from "@/../public/arrow-happy-clients@2x.png";
import clientAverbis from "@/../public/client-averbis@2x.png";
import clientFFF from "@/../public/client-fff@2x.png";
import clientHippo from "@/../public/client-hippo@2x.png";
import clientSportank from "@/../public/client-sportank@2x.png";
import * as motion from "@/lib/motion";
import { Variants } from "framer-motion";
import Image from "next/image";

export default function ClientsSection(): JSX.Element {
  const variants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const item: Variants = {
    hidden: {
      opacity: 0,
      y: "-50px",
      scale: 0,
    },
    visible: {
      opacity: 1,
      y: "0px",
      scale: 1,
    },
  };

  return (
    <div className="landing-section container relative">
      <Image
        src={arrowHappyClients}
        alt="Arrow with caption 'check out my recent work'"
        className="hidden lg:relative absolute left-[550px] -top-[200px] pointer-events-none"
        width={303}
        height={293}
      />

      <motion.div
        className="grid grid-cols-2 lg:grid-cols-4 gap-[50px] items-center px-[10%] lg:mt-[300px]"
        variants={variants}
        initial={"hidden"}
        whileInView={"visible"}
        viewport={{ once: true }}
      >
        <motion.div
          className="flex flex-row items-center justify-center"
          variants={item}
        >
          <Image
            src={clientSportank}
            alt="sportank logo"
            width={328}
            height={38.11}
          ></Image>
        </motion.div>
        <motion.div
          className="flex flex-row items-center justify-center"
          variants={item}
        >
          <Image
            src={clientAverbis}
            alt="averbis GmbH logo"
            width={200}
            height={66}
          ></Image>
        </motion.div>
        <motion.div
          className="flex flex-row items-center justify-center"
          variants={item}
        >
          <Image
            src={clientHippo}
            alt="hippo digital logo"
            width={192.13}
            height={57.39}
          ></Image>
        </motion.div>

        <motion.div
          className="flex flex-row items-center justify-center"
          variants={item}
        >
          <Image
            src={clientFFF}
            alt="Fifty Five and Five logo"
            width={301}
            height={45}
          ></Image>
        </motion.div>
      </motion.div>
    </div>
  );
}
