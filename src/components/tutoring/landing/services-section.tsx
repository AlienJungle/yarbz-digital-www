import Image, { StaticImageData } from "next/image";

import iconThumb from "@/../public/tutoring/icon-thumb.svg";
import iconTutoring from "@/../public/tutoring/icon-tutoring.svg";

export default function ServicesSection() {
  const cards: { imageSrc: StaticImageData; title: string; description: string }[] = [
    {
      imageSrc: iconTutoring,
      title: "Beginner 2 Advanced tutoring",
      description: "For those interesting in learning modern software development from the ground up!",
    },
    {
      imageSrc: iconThumb,
      title: "Code review & feedback",
      description: "Send me your code, and receive an expert code review with live feedback over a call.",
    },
    {
      imageSrc: iconThumb,
      title: "Interview prep. and practice",
      description: "Prepare for your big interview the right way by letting me share my experience in both interviewing and hiring.",
    },
  ];

  return (
    <div className="my-32">
      <h1 className="text-3xl font-semibold leading-[64px] max-w-[381px]">What can I help with?</h1>
      <div className="mt-[90px] grid grid-cols-3 gap-x-[77px]">
        {cards.map((card) => (
          <div key={card.title} className="rounded-[8px] bg-yd-tut-lightgreen p-[32px] relative shadow-yd-default">
            <div className="absolute w-[65px] h-[65px] left-[32px] top-0 -translate-y-1/2 flex justify-center items-center bg-yd-tut-green rounded-[5px]">
              <Image src={card.imageSrc} alt="" width={40} />
            </div>

            <h2 className="text-lg font-semibold mt-[32px] mb-[19px]">{card.title}</h2>
            <p>{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
