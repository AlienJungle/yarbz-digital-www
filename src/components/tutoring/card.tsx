import classNames from "classnames";
import { PropsWithChildren } from "react";

interface UICardProps {
  title?: string;
  className?: string;
  theme?: "green" | "grey";
}

export default function Card({ title, children, className, theme }: UICardProps & PropsWithChildren) {
  const currTheme = theme ?? "grey";

  return (
    <div
      className={classNames("col-span-2 card-tut", className, {
        "!bg-yd-tut-lightgreen shadow-yd-default": currTheme === "green",
      })}
    >
      {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
      <>{children}</>
    </div>
  );
}
