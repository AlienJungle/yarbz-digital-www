import classNames from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme: "green" | "black" | "grey";
}

export const THEME_CLASSNAME_GREEN = "bg-yd-tut-green text-yd-tut-black";
export const THEME_CLASSNAME_BLACK = "bg-yd-tut-black text-yd-tut-white";
export const THEME_CLASSNAME_GREY = "bg-gray-100 text-yd-tut-black";

export default function Button(props: ButtonProps) {
  console.log(props.className);

  return (
    <button
      {...props}
      className={classNames("btn-tut", props.className, {
        [THEME_CLASSNAME_GREEN]: props.theme === "green",
        [THEME_CLASSNAME_BLACK]: props.theme === "black",
        [THEME_CLASSNAME_GREY]: props.theme === "grey",
      })}
    >
      {props.children}
    </button>
  );
}
