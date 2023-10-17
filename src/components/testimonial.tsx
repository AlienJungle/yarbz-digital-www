import Image, { StaticImageData } from "next/image";

interface TestimonialProps {
  body: string;
  author: string;
  position: string;
  authorImageSrc: StaticImageData;
}

export default function Testimonial({ body, author, position, authorImageSrc }: TestimonialProps): JSX.Element {
  return (
    <div className="flex flex-col ">
      <p>{body}</p>
      <div className="flex flex-row gap-x-[16px] items-center mt-[40px]">
        <Image src={authorImageSrc} alt={`picture of ${author}`} className="rounded-full" width={54} height={54} />
        <div className="flex flex-col justify-center">
          <p className="text-lg font-semibold">{author}</p>
          <p className="text-md font-medium text-yd-orange">{position}</p>
        </div>
      </div>
    </div>
  );
}
