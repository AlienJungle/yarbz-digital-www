"use client";

import Flickity from "react-flickity-component";
import { PropsWithChildren, useRef } from "react";

export default function WorkSlider({
  children,
}: PropsWithChildren): JSX.Element {
  return (
    <div className="overflow-x-hidden">
      <Flickity
        elementType={"div"}
        className="w-full"
        reloadOnUpdate={true}
        static={true}
        options={{
          wrapAround: false,
          autoPlay: 3000,
          pauseAutoPlayOnHover: false,
          pageDots: true,
          prevNextButtons: false,
          cellAlign: "left",
        }}
      >
        {children}
      </Flickity>
    </div>
  );
}
