"use client";

import { introVariants } from "@/animations";
import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <motion.main className="full-screen flex flex-col items-center justify-center" variants={introVariants} initial={"hidden"} animate={"visible"}>
      <h1 className="text-2xl font-semibold text-yd-orange">Page not found!</h1>
      <p className="my-6">Sorry, but it looks like this page doesn&apos;t exist.</p>
      <Link href="/" className="btn bg-yd-dark-blue text-yd-white">
        Back home
      </Link>
    </motion.main>
  );
}
