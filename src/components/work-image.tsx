import Image, { StaticImageData } from "next/image";

interface WorkImageProps {
  imageSrc: StaticImageData;
  imageAlt: string;
}

export default function WorkImage({ imageSrc, imageAlt }: WorkImageProps) {
  return (
    <Image
      src={imageSrc}
      alt={imageAlt}
      className="rounded-[20px] mx-[30px] drop-shadow-md p-2"
      width={3066}
      height={2300}
    />
  );
}
