"use client";

import Image from "next/image";

import logo from "@/../public/tutoring/logo.svg";
import { DecodedIdTokenUser } from "@/app/api/_models/user";
import { hoverVariant, tapVariant } from "@/lib/animations";
import * as motion from "@/lib/motion";
import { useAuth } from "@/lib/useAuth";
import classNames from "classnames";
import Link from "next/link";
import Button, { THEME_CLASSNAME_GREEN } from "./button";

interface HeaderNavProps {
  hideNavItems?: boolean;
  user?: DecodedIdTokenUser | null;
}

export default function HeaderNav(props: HeaderNavProps) {
  const { logout } = useAuth();

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

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="flex flex-row justify-between items-center gap-[47px] px-[45px] py-[25px]">
      <div className="flex-1">
        <motion.a href={baseHref} whileTap={tapVariant} className="inline-block">
          <Image src={logo} alt="yarbz tutoring logo" />
        </motion.a>
      </div>

      <div className="flex-1 flex flex-row gap-[47px] items-center font-semibold justify-center">
        {!props.hideNavItems &&
          links.map((link) => {
            return (
              <motion.a key={link.href} href={link.href} whileTap={tapVariant} whileHover={hoverVariant}>
                {link.text}
              </motion.a>
            );
          })}
      </div>

      <div className="flex-1 flex flex-row items-center gap-x-[20px] justify-end">
        {props.user && (
          <>
            <Link href={"/tutoring/dashboard"} className={classNames("btn-tut", THEME_CLASSNAME_GREEN)}>
              Dashboard
            </Link>

            <Button theme="black" onClick={() => handleLogout()}>
              Logout
            </Button>
          </>
        )}

        {!props.user && (
          <>
            <Link href={"/tutoring/login"} className={classNames("btn-tut", THEME_CLASSNAME_GREEN)}>
              Student login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
