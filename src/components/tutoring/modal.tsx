import * as motion from "@/lib/motion";
import classNames from "classnames";
import { Variants } from "framer-motion";
import { PropsWithChildren } from "react";

interface ModalProps extends PropsWithChildren {
  className?: string;
  title?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({
  className,
  title,
  isOpen,
  children,
  onClose,
}: ModalProps) {
  const bgVariants: Variants = {
    hidden: {
      opacity: 0,
      pointerEvents: "none",
    },
    visible: {
      opacity: 1,
      pointerEvents: "auto",
    },
  };

  const modalVariants: Variants = {
    hidden: {
      opacity: 1,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
    },
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    if ((e.target as HTMLElement).getAttribute("data-modal-bg")) {
      onClose();
    }
  };

  return (
    <motion.div
      animate={isOpen ? "visible" : "hidden"}
      initial={"hidden"}
      variants={bgVariants}
      className={classNames(
        "left-0 top-0 w-full h-full bg-yd-tut-black bg-opacity-40 flex flex-col items-center lg:justify-center justify-end fixed",
      )}
      onClick={handleOutsideClick}
      data-modal-bg
    >
      <motion.div
        variants={modalVariants}
        animate={isOpen ? "visible" : "hidden"}
        className={classNames(
          "bg-yd-tut-white p-[25px] rounded-t-2xl lg:rounded-lg w-full lg:w-auto",
          className,
        )}
      >
        {title && <h2 className="mb-[20px] text-xl">{title}</h2>}
        <div className="modal-body">{children}</div>
      </motion.div>
    </motion.div>
  );
}

export function ModalActions({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-row items-center justify-end gap-x-[20px] mt-[40px]">
      {children}
    </div>
  );
}
