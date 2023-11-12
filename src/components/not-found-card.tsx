"use client";

import { introVariants } from "@/lib/animations";
import * as motion from "@/lib/motion";
import Link from "next/link";

interface NotFoundProps {
  returnHref: string;
}

export default function NotFoundCard({ returnHref }: NotFoundProps) {
  return (
    <motion.main
      className="full-screen flex flex-col items-center justify-center"
      variants={introVariants}
      initial={"hidden"}
      animate={"visible"}
    >
      <h1 className="text-2xl font-semibold text-yd-orange">Page not found!</h1>
      <p className="my-6">
        Sorry, but it looks like this page doesn&apos;t exist.
      </p>
      <Link href={returnHref} className="btn bg-yd-dark-blue text-yd-white">
        Back home
      </Link>
    </motion.main>
  );
}
