import { PropsWithChildren } from "react";
import Flickity from "react-flickity-component";

export default function TestimonialSlider({ children }: PropsWithChildren): JSX.Element {
  return (
    <Flickity
      elementType={"div"}
      className="w-full"
      reloadOnUpdate={true}
      static={false}
      options={{
        wrapAround: false,
        autoPlay: 6000,
        pauseAutoPlayOnHover: false,
        pageDots: true,
        prevNextButtons: true,
        cellAlign: "left",
        resize: true,
      }}
    >
      {children}
    </Flickity>
  );
}
