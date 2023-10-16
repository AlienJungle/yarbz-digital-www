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
    <div className="service-card rounded-xl hover:bg-yd-dark-blue hover:border-yd-dark-blue hover:text-yd-white transition-colors duration-500 cursor-pointer border-2 group">
      <div className="p-[25px] flex flex-row items-center gap-x-[32px]">
        <Image
          src={imageSrc}
          className="flex-shrink-0"
          alt={imageAlt}
          height={115}
          width={115}
        />
        <p className="font-semibold text-lg pr-[20px]">{title}</p>
      </div>
      <p className="px-[25px] overflow-hidden relative opacity-0 block max-h-0 group-hover:max-h-[900px] group-hover:py-[25px] border-t-2 group-hover:border-yd-orange group-hover:opacity-100 transition-all duration-500">
        {description}
      </p>
    </div>
  );
}
