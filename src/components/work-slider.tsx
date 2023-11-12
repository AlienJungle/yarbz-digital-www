"use client";

import { PropsWithChildren } from "react";
import Flickity from "react-flickity-component";

export default function WorkSlider({ children }: PropsWithChildren): JSX.Element {
  return (
    <div className="overflow-x-hidden overflow-y-hidden">
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
          resize: true,
          adaptiveHeight: true,
        }}
      >
        {children}
      </Flickity>
    </div>
  );
}
