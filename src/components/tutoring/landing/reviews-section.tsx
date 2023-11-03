import ReviewCard from "../review-card";

import reviewAron from "@/../public/tutoring/review-aron@2x.png";
import reviewArsen from "@/../public/tutoring/review-arsen@2x.png";

export default function ReviewsSection() {
  return (
    <div className="my-32">
      <h1 className="text-3xl font-semibold leading-[60px] mb-[74px] text-center">What my students have to say!</h1>
      <div className="grid grid-cols-2 grid-rows-2 gap-[20px]">
        <div className="col-span-1 row-span-1">
          <ReviewCard title="Arsen" body="Aaron is a fantastic teacher, demonstrating both depth of knowledge and making content very engaging. Would highly recommend him to anyone diving into web development." imageSrc={reviewArsen} />
        </div>
        <div className="col-span-1 row-span-2">
          <ReviewCard title="Aron" body="Aaron is currently helping me to catch up with a full-stack web-developer bootcamp, that was well above my level of knowledge when I started it. But now thankfully to the help, at last I can kind of see the light at the end of the tunnel; I managed to familiarize myself with a lot of the complex concepts involved in programming and I can see that I will eventually get through the challenges involved in starting a career in this field. Aaron is maximally friendly, patient, tries to accommodate the needs of the student and very well versed in the profession of coding. I am very satisfied, absolutely recommended." imageSrc={reviewAron} />
        </div>
        <div className="col-span-1"></div>
      </div>
    </div>
  );
}
