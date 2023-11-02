"use client";

import Image from "next/image";

import { hoverVariant, tapVariant } from "@/lib/animations";
import * as motion from "@/lib/motion";
import { Variants } from "framer-motion";

import logo from "@/../public/tutoring/logo.svg";
import * as fbContext from "@/firebase";
import classNames from "classnames";
import { User } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button, { THEME_CLASSNAME_GREEN } from "./button";

interface HeaderNavProps {
  hideNavItems?: boolean;
  user?: User | null;
}

export default function HeaderNav(props: HeaderNavProps) {
  const baseHref = "/tutoring";

  const links: { href: string; text: string }[] = [
    {
      href: "#services",
      text: "Services",
    },
    {
      href: "#about",
      text: "About",
    },
    {
      href: "#reviews",
      text: "Reviews",
    },
    {
      href: "#pricing",
      text: "Pricing",
    },
    {
      href: "#faq",
      text: "FAQ",
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

  const [currUser, setCurrUser] = useState<User | null>(null);

  useEffect(() => {
    fbContext.auth.onAuthStateChanged((user) => {
      console.log(user);
      setCurrUser(user);
    });
  }, []);

  const router = useRouter();

  const handleLogout = () => {
    fbContext.auth
      .signOut()
      .then(() => {
        router.push("/tutoring");
      })
      .catch((err) => {
        alert("Something went wrong: " + err);
      });
  };

  return (
    <nav className="flex flex-row justify-between items-center gap-[47px] px-[45px] py-[25px]">
      <motion.a variants={item} initial="hidden" animate="visible" href={baseHref} whileTap={tapVariant} whileHover={hoverVariant}>
        <Image src={logo} alt="yarbz tutoring logo" />
      </motion.a>

      <motion.div className="flex flex-row gap-[47px] justify-end items-center font-semibold" variants={variants} initial="hidden" animate="visible">
        {!props.hideNavItems &&
          links.map((link) => {
            return (
              <motion.a key={link.href} href={link.href} variants={item} whileTap={tapVariant} whileHover={hoverVariant}>
                {link.text}
              </motion.a>
            );
          })}

        <div className="flex flex-row items-center gap-x-[20px]">
          {currUser && (
            <>
              <Link href={"/tutoring/dashboard"} className={classNames("btn-tut", THEME_CLASSNAME_GREEN)}>
                Dashboard
              </Link>

              <Button theme="black" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}

          {!currUser && (
            <>
              <Link href={"/tutoring/login"} className={classNames("btn-tut", THEME_CLASSNAME_GREEN)}>
                Student login
              </Link>
            </>
          )}
        </div>
      </motion.div>
    </nav>
  );
}
