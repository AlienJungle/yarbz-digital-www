import Image from "next/image";

import logo from "../../public/logo.svg";
import { statics } from "@/static";

export default function HeaderNav() {
  return (
    <nav className="flex flex-row justify-between items-center gap-[47px] px-[45px] py-[25px]">
      <Image src={logo} alt="yarbz.digital logo" />

      <div className="flex flex-row gap-[47px] justify-end items-center font-semibold">
        <a href="#services">Services</a>
        <a href="#work">Work</a>
        <a href="#testimonials">Testimonials</a>
        <a className="bg-yd-orange text-yd-white btn" href={statics.calendlyUrl}>
          Get in touch
        </a>
      </div>
    </nav>
  );
}
