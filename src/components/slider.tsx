import { PropsWithChildren, ReactNode } from "react";

export default function Slider(props: PropsWithChildren) {
  return (
    <div>
      {Array(props.children).map((child: ReactNode, i: number) => (
        <div key={i} className="absolute">
          {child}
        </div>
      ))}
    </div>
  );
}
