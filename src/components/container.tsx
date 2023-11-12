import classNames from "classnames";
import { PropsWithChildren } from "react";

interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    PropsWithChildren {
  maxWidth?: number;
}

export default function Container({
  className,
  children,
  maxWidth,
  ...rest
}: ContainerProps) {
  // const { className, children, maxWidth } = props;
  return (
    <div
      {...rest}
      className={classNames("container mx-auto my-20", className, {
        [`!max-w-[${maxWidth}px]`]: !!maxWidth,
      })}
    >
      {children}
    </div>
  );
}
