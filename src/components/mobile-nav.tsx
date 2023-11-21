import Image, { StaticImageData } from "next/image";

import * as motion from "@/lib/motion";
import { Variants } from "framer-motion";
import Link from "next/link";

interface MobileNavProps {
  isOpen: boolean;
  icon: StaticImageData;
  links: { [title: string]: string };
  onClose: () => void;
}

export default function MobileNav({
  isOpen,
  icon,
  links,
  onClose,
}: MobileNavProps) {
  const menuVariants: Variants = {
    hidden: {
      opacity: 0,
      translateX: "100%",
    },
    visible: {
      opacity: 1,
      translateX: "0%",
      transition: {
        type: "tween",
      },
    },
  };

  const menuListVariants: Variants = {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const menuItemVariants: Variants = {
    hidden: {
      opacity: 0,
      translateX: "200px",
    },
    visible: {
      opacity: 1,
      translateX: "0%",
    },
  };

  return (
    <motion.div
      className="absolute xl:hidden top-0 left-0 w-screen h-screen px-[25px] py-[20px] bg-yd-dark-blue z-10 overflow-y-visible"
      animate={isOpen ? "visible" : "hidden"}
      initial={"hidden"}
      variants={menuVariants}
    >
      <div className="flex flex-row justify-between items-center">
        <div>
          <Image src={icon} alt="" className="w-[120px]" />
        </div>
        <button onClick={() => onClose()}>
          <svg
            width="39"
            height="39"
            viewBox="0 0 39 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M35.75 29.258c0 .893-.724 1.617-1.617 1.617H21.117a1.617 1.617 0 0 1 0-3.234h13.016c.893 0 1.617.724 1.617 1.617ZM35.75 19.5c0 .894-.724 1.617-1.617 1.617H4.867a1.617 1.617 0 1 1 0-3.234h29.266c.893 0 1.617.724 1.617 1.617ZM34.133 11.36a1.617 1.617 0 0 0 0-3.235H14.617a1.617 1.617 0 1 0 0 3.234h19.516Z"
              className="fill-yd-white"
            />
          </svg>
        </button>
      </div>

      <div className="mt-[100px] mb-[50px]">
        <motion.ul
          className="flex flex-col items-center font-medium text-2xl text-yd-white gap-y-[40px]"
          variants={menuListVariants}
          animate={isOpen ? "visible" : "hidden"}
        >
          {Object.entries(links).map(([title, href]) => (
            <motion.li key={title} variants={menuItemVariants}>
              <Link href={href} onClick={onClose}>
                {title}
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.div>
  );
}
