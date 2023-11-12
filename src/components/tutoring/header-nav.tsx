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
  const baseHref = "/tutoring";

  const links: { href: string; text: string }[] = [
    {
      href: "/tutoring#services",
      text: "Services",
    },
    {
      href: "/tutoring#about",
      text: "About",
    },
    {
      href: "/tutoring#reviews",
      text: "Reviews",
    },
    {
      href: "/tutoring#pricing",
      text: "Pricing",
    },
    {
      href: "/tutoring#faq",
      text: "FAQ",
    },
  ];

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="flex flex-row justify-between items-center gap-[47px] py-[20px] px-[25px] lg:px-[45px] lg:py-[25px]">
      <div className="flex-1">
        <motion.a href={baseHref} whileTap={tapVariant} className="inline-block">
          <Image src={logo} alt="yarbz tutoring logo" className="w-[120px] lg:w-auto" />
        </motion.a>
      </div>

      <div className="hidden lg:flex flex-1 flex-row gap-[47px] items-center font-semibold justify-center">
        {!props.hideNavItems &&
          links.map((link) => {
            return (
              <motion.a key={link.href} href={link.href} whileTap={tapVariant} whileHover={hoverVariant}>
                {link.text}
              </motion.a>
            );
          })}
      </div>

      <div className="hidden flex-1 lg:flex flex-row items-center gap-x-[20px] justify-end">
        {props.user && (
          <>
            <motion.span whileHover={hoverVariant} whileTap={tapVariant}>
              <Link href={"/tutoring/dashboard"} className={classNames("btn-tut", THEME_CLASSNAME_GREEN)}>
                Dashboard
              </Link>
            </motion.span>

            <Button theme="black" onClick={() => handleLogout()}>
              Logout
            </Button>
          </>
        )}

        {!props.user && (
          <>
            <motion.span whileHover={hoverVariant} whileTap={tapVariant}>
              <Link href={"/tutoring/login"} className={classNames("btn-tut", THEME_CLASSNAME_GREEN)}>
                Student login
              </Link>
            </motion.span>
          </>
        )}
      </div>

      <div className="lg:hidden">
        <button>
          <svg height="32" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 10h24a2 2 0 0 0 0-4H4a2 2 0 0 0 0 4zm24 4H4a2 2 0 0 0 0 4h24a2 2 0 0 0 0-4zm0 8H4a2 2 0 0 0 0 4h24a2 2 0 0 0 0-4z" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
