import Flickity from "react-flickity-component";
import { PropsWithChildren, useRef } from "react";

export default function WorkSlider({
  children,
}: PropsWithChildren): JSX.Element {
  const sliderRef = useRef();

  return (
    <div className="overflow-x-hidden">
      <Flickity
        elementType={"div"}
        className="w-full"
        reloadOnUpdate={true}
        options={{
          wrapAround: false,
          autoPlay: 2500,
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
