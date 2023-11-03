import Image, { StaticImageData } from "next/image";

interface ReviewCardProps {
  imageSrc: StaticImageData;
  title: string;
  body: string;
}

export default function ReviewCard(props: ReviewCardProps) {
  return (
    <div className="p-[30px] bg-yd-tut-lightgreen rounded-lg shadow-yd-default">
      <div className="flex flex-col gap-x-[24px]">
        <div className="flex flex-row gap-x-[20px] items-center">
          <Image src={props.imageSrc} width={56} height={56} alt="" className="rounded-md" />
          <span className="text-xl leading-[32px] font-semibold">{props.title}</span>
        </div>

        <p className="leading-[30px] mt-[24px]">{props.body}</p>
      </div>
    </div>
  );
}
