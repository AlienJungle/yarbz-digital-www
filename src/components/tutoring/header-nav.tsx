"use client";

import Image from "next/image";

import logoWhite from "@/../public/tutoring/logo-white.svg";
import logo from "@/../public/tutoring/logo.svg";
import { DecodedIdTokenUser } from "@/app/api/_models/user";
import { hoverVariant, tapVariant } from "@/lib/animations";
import * as motion from "@/lib/motion";
import { useAuth } from "@/lib/useAuth";
import classNames from "classnames";
import Link from "next/link";
import { useState } from "react";
import MobileNav from "../mobile-nav";
import Button, { THEME_CLASSNAME_GREEN } from "./button";

interface HeaderNavProps {
  hideNavItems?: boolean;
  user?: DecodedIdTokenUser | null;
}

export default function HeaderNav(props: HeaderNavProps) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const baseHref = "/tutoring";

  const links: { [href: string]: string } = {
    Services: "/tutoring#services",
    About: "/tutoring#about",
    Reviews: "/tutoring#reviews",
    Pricing: "/tutoring#pricing",
    FAQ: "/tutoring#faq",
  };

  const mobileLinks = {
    ...links,
    "Privacy Policy": "/privacy-policy",
    "Terms of Service": "/terms-of-service",
  };

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <nav className="flex flex-row justify-between items-center gap-[47px] py-[20px] px-[25px] lg:px-[45px] lg:py-[25px]">
        <div className="flex-1">
          <motion.a
            href={baseHref}
            whileTap={tapVariant}
            className="inline-block"
          >
            <Image
              src={logo}
              alt="yarbz tutoring logo"
              className="w-[120px] lg:w-auto"
            />
          </motion.a>
        </div>

        <div className="hidden lg:flex flex-1 flex-row gap-[47px] items-center font-semibold justify-center">
          {!props.hideNavItems &&
            Object.entries(links).map(([title, href]) => {
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
        </div>

        <div className="hidden flex-1 lg:flex flex-row items-center gap-x-[20px] justify-end">
          {props.user && (
            <>
              <motion.span whileHover={hoverVariant} whileTap={tapVariant}>
                <Link
                  href={"/tutoring/dashboard"}
                  className={classNames("btn-tut", THEME_CLASSNAME_GREEN)}
                >
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
                <Link
                  href={"/tutoring/login"}
                  className={classNames("btn-tut", THEME_CLASSNAME_GREEN)}
                >
                  Student login
                </Link>
              </motion.span>
            </>
          )}
        </div>

        <div className="lg:hidden">
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
                  "fill-yd-tut-black": !isMobileNavOpen,
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
