import Image, { StaticImageData } from "next/image";

interface ServiceCardProps {
  imageSrc: StaticImageData;
  imageAlt: string;
  title: JSX.Element;
  description: JSX.Element;
}

export default function ServiceCard({
  imageSrc,
  imageAlt,
  title,
  description,
}: ServiceCardProps) {
  return (
    <div className="bg-[#1C1C4F] p-[25px] rounded-[20px] flex flex-row items-center gap-x-[32px] drop-shadow-md border-yd-dark-blue">
      <Image
        src={imageSrc}
        className="rounded-[20px] flex-shrink-0"
        alt={imageAlt}
        height={115}
        width={115}
      />
      <p className="text-yd-white font-semibold text-[22.5px] pr-[20px]">
        {title}
      </p>
    </div>
  );
}
