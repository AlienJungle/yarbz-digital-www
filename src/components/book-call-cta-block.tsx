import { hoverVariant, tapVariant } from "@/lib/animations";
import * as motion from "@/lib/motion";
import { statics } from "@/static";
import Image from "next/image";

import bgOrangeWave from "../../public/bg-orange-wave.svg";

export default function BookCallCTABlock(): JSX.Element {
  return (
    <div className="my-[200px] container relative">
      <div className="max-w-[1012px] p-[54px] flex flex-col items-center justify-center mx-auto bg-yd-light-grey rounded-2xl relative overflow-hidden">
        <Image src={bgOrangeWave} alt="" className="absolute bottom-0 pointer-events-none min-w-[1104px]" />
        <h2 className="text-2xl font-semibold text-yd-dark-blue">Ready to take it to the next level?</h2>
        <p className="mt-[29px] mb-[48px] max-w-[578px]">Book a free call with me to get started. If you&apos;d rather, you can contact me by email at aaron AT alienjungle DOT digital.</p>
        <motion.a href={statics.bookingURL} className="btn text-yd-white bg-yd-dark-blue" target="_blank" rel="nofollow noopener" whileHover={hoverVariant} whileTap={tapVariant}>
          Book a call
        </motion.a>
      </div>
    </div>
  );
}
