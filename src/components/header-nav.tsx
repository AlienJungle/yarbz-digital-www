"use client";

import { hoverVariant, tapVariant } from "@/lib/animations";
import * as motion from "@/lib/motion";
import { statics } from "@/static";
import { Variants } from "framer-motion";
import Image from "next/image";

import classNames from "classnames";
import { useState } from "react";
import logoWhite from "../../public/logo-white.svg";
import logo from "../../public/logo.svg";
import MobileNav from "./mobile-nav";

export default function HeaderNav() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const links: { [href: string]: string } = {
    Services: "/#services",
    Work: "/#work",
    Testimonials: "/#testimonials",
  };

  const mobileLinks = {
    Home: "/",
    ...links,
    "Privacy Policy": "/privacy-policy",
    "Terms of Service": "/terms-of-service",
  };

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
    <>
      <nav className="flex flex-row justify-between items-center gap-[47px] px-[20px] py-[20px] lg:px-[45px] lg:py-[25px]">
        <motion.a
          variants={item}
          initial="hidden"
          animate="visible"
          href="/"
          whileTap={tapVariant}
          whileHover={hoverVariant}
        >
          <Image
            src={logo}
            alt="yarbz.digital logo"
            width={130}
            className="w-[115px] lg:w-[130px]"
          />
        </motion.a>

        <motion.div
          className="hidden lg:flex flex-row gap-[47px] justify-end items-center font-semibold"
          variants={variants}
          initial="hidden"
          animate="visible"
        >
          {Object.entries(links).map(([title, href]) => {
            return (
              <motion.a
                key={href}
                href={href}
                whileTap={tapVariant}
                whileHover={hoverVariant}
              >
                {title}
              </motion.a>
            );
          })}

          <motion.a
            className="bg-yd-orange text-yd-white btn"
            href={statics.bookingURL}
            target="_blank"
            rel="nofollow noopener"
            variants={item}
            whileTap={tapVariant}
            whileHover={hoverVariant}
          >
            Get in touch
          </motion.a>
        </motion.div>

        <div className="xl:hidden">
          <button onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}>
            <svg
              width="39"
              height="39"
              viewBox="0 0 39 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M35.75 29.258c0 .893-.724 1.617-1.617 1.617H21.117a1.617 1.617 0 0 1 0-3.234h13.016c.893 0 1.617.724 1.617 1.617ZM35.75 19.5c0 .894-.724 1.617-1.617 1.617H4.867a1.617 1.617 0 1 1 0-3.234h29.266c.893 0 1.617.724 1.617 1.617ZM34.133 11.36a1.617 1.617 0 0 0 0-3.235H14.617a1.617 1.617 0 1 0 0 3.234h19.516Z"
                className={classNames({
                  "fill-yd-white": isMobileNavOpen,
                  "fill-black": !isMobileNavOpen,
                })}
              />
            </svg>
          </button>
        </div>
      </nav>
      <MobileNav
        isOpen={isMobileNavOpen}
        icon={logoWhite}
        links={mobileLinks}
        onClose={() => setIsMobileNavOpen(false)}
      />
    </>
  );
}
