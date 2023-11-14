import * as icon from "@/app/(tutoring)/icon.ico";
import Image from "next/image";
import { ImageResponse } from "next/og";

export default function Icon() {
  return new ImageResponse(<Image src={icon} alt="" />);
}
