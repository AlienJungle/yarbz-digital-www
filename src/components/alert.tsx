"use client";

import classNames from "classnames";
import { PropsWithChildren, useState } from "react";

interface AlertProps extends PropsWithChildren {
  type?: "info" | "error";
  className?: string;
}

export default function Alert({ children, className, type }: AlertProps) {
  const [isVisible, setVisible] = useState<boolean>(true);

  const classNameComputed = classNames("py-[12px] px-[20px] rounded-md bg-yd-tut-green text-yd-tut-black shadow-yd-default flex flex-row items-center gap-x-[10px]", className, {
    "bg-yd-tut-green": !type || type === "info",
    "bg-red-100": type === "error",
  });

  return (
    <>
      {isVisible && (
        <div className={classNameComputed}>
          <svg height="24" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h48v48H0z" fill="none" />
            <path d="M22 34h4V22h-4v12zm2-30C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.82 0-16-7.18-16-16S15.18 8 24 8s16 7.18 16 16-7.18 16-16 16zm-2-22h4v-4h-4v4z" className="fill-yd-stroke-black" />
          </svg>
          <div className="flex-grow">{children}</div>
          {/* <svg height="24" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M437.5 386.6 306.9 256l130.6-130.6c14.1-14.1 14.1-36.8 0-50.9-14.1-14.1-36.8-14.1-50.9 0L256 205.1 125.4 74.5c-14.1-14.1-36.8-14.1-50.9 0-14.1 14.1-14.1 36.8 0 50.9L205.1 256 74.5 386.6c-14.1 14.1-14.1 36.8 0 50.9 14.1 14.1 36.8 14.1 50.9 0L256 306.9l130.6 130.6c14.1 14.1 36.8 14.1 50.9 0 14-14.1 14-36.9 0-50.9z" className="fill-yd-tut-black cursor-pointer" onClick={() => setVisible(false)}/></svg> */}

          <div className="cursor-pointer" onClick={() => setVisible(false)}>
            <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.225 4.811a1 1 0 0 0-1.414 1.414L10.586 12 4.81 17.775a1 1 0 1 0 1.414 1.414L12 13.414l5.775 5.775a1 1 0 0 0 1.414-1.414L13.414 12l5.775-5.775a1 1 0 0 0-1.414-1.414L12 10.586 6.225 4.81Z" className="fill-yd-tut-black" />
            </svg>
          </div>
        </div>
      )}
    </>
  );
}
