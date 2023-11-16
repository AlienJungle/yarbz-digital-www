import classNames from "classnames";
import { PropsWithChildren } from "react";

interface UICardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    PropsWithChildren {
  title?: string;
  theme?: "green" | "grey";
}

export default function Card({
  title,
  children,
  theme,
  className,
  style,
}: UICardProps) {
  const currTheme = theme ?? "grey";

  return (
    <div
      style={style}
      className={classNames(
        "col-span-2 card-tut shadow-yd-default",
        className,
        {
          "!bg-yd-tut-lightgreen shadow-yd-default": currTheme === "green",
        },
      )}
    >
      {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
      <>{children}</>
    </div>
  );
}
