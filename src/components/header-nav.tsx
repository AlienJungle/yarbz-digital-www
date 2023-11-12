import { hoverVariant, tapVariant } from "@/lib/animations";
import * as motion from "@/lib/motion";
import { statics } from "@/static";
import { Variants } from "framer-motion";
import Image from "next/image";

import logo from "../../public/logo.svg";

export default function HeaderNav() {
  const links: { href: string; text: string }[] = [
    {
      href: "/#services",
      text: "Services",
    },
    {
      href: "/#work",
      text: "Work",
    },
    {
      href: "/#testimonials",
      text: "Testimonials",
    },
  ];

  const variants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <nav className="flex flex-row justify-between items-center gap-[47px] px-[20px] py-[20px] lg:px-[45px] lg:py-[25px]">
      <motion.a variants={item} initial="hidden" animate="visible" href="/" whileTap={tapVariant} whileHover={hoverVariant}>
        <Image src={logo} alt="yarbz.digital logo" width={130} className="w-[115px] lg:w-[130px]" />
      </motion.a>

      <motion.div className="hidden lg:flex flex-row gap-[47px] justify-end items-center font-semibold" variants={variants} initial="hidden" animate="visible">
        {links.map((link) => {
          return (
            <motion.a key={link.href} href={link.href} variants={item} whileTap={tapVariant} whileHover={hoverVariant}>
              {link.text}
            </motion.a>
          );
        })}

        <motion.a className="bg-yd-orange text-yd-white btn" href={statics.bookingURL} target="_blank" rel="nofollow noopener" variants={item} whileTap={tapVariant} whileHover={hoverVariant}>
          Get in touch
        </motion.a>
      </motion.div>
    </nav>
  );
}
