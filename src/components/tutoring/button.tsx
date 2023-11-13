import { hoverVariant, tapVariant } from "@/lib/animations";
import * as motion from "@/lib/motion";
import classNames from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme: "green" | "black" | "grey" | "orange";
  size?: "normal" | "small";
}

export const THEME_CLASSNAME_GREEN = "bg-yd-tut-green text-yd-tut-black";
export const THEME_CLASSNAME_BLACK = "bg-yd-tut-black text-yd-tut-white";
export const THEME_CLASSNAME_GREY = "bg-gray-100 text-yd-tut-black";
export const THEME_CLASSNAME_ORANGE = "bg-yd-orange text-yd-black";

export default function Button(props: ButtonProps) {
  return (
    <motion.span whileHover={hoverVariant} whileTap={tapVariant}>
      <button
        {...props}
        className={classNames("btn-tut w-full", props.className, {
          [THEME_CLASSNAME_GREEN]: props.theme === "green",
          [THEME_CLASSNAME_BLACK]: props.theme === "black",
          [THEME_CLASSNAME_GREY]: props.theme === "grey",
          [THEME_CLASSNAME_ORANGE]: props.theme === "orange",
          "btn-tut-small": props.size === "small",
        })}
      >
        {props.children}
      </button>
    </motion.span>
  );
}
