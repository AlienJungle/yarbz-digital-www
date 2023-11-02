import classNames from "classnames";
import { PropsWithChildren } from "react";

interface UICardProps {
  title: string;
  className?: string;
}

export default function Card({ title, children, className }: UICardProps & PropsWithChildren) {
  return (
    <div className={classNames("col-span-2 card-tut", className)}>
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <>{children}</>
    </div>
  );
}
