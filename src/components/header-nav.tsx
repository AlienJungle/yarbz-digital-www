"use client";

import Image from "next/image";

import { statics } from "@/static";
import { Variants, motion } from "framer-motion";
import logo from "../../public/logo.svg";

export default function HeaderNav() {
  const links: { href: string; text: string }[] = [
    {
      href: "#services",
      text: "Services",
    },
    {
      href: "#work",
      text: "Work",
    },
    {
      href: "#testimonials",
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
    <nav className="flex flex-row justify-between items-center gap-[47px] px-[45px] py-[25px]">
      <Image src={logo} alt="yarbz.digital logo" />

      <motion.div
        className="flex flex-row gap-[47px] justify-end items-center font-semibold"
        variants={variants}
        initial="hidden"
        animate="visible"
      >
        {links.map((link) => {
          return (
            <motion.a key={link.href} href={link.href} variants={item}>
              {link.text}
            </motion.a>
          );
        })}

        <motion.a
          className="bg-yd-orange text-yd-white btn"
          href={statics.calendlyUrl}
          variants={item}
        >
          Get in touch
        </motion.a>
      </motion.div>
    </nav>
  );
}
