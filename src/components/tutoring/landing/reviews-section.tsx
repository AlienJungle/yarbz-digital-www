import ReviewCard from "../review-card";

import reviewAron from "@/../public/tutoring/review-aron@2x.png";
import reviewArsen from "@/../public/tutoring/review-arsen@2x.png";
import reviewMo from "@/../public/tutoring/review-mo.png";

export default function ReviewsSection() {
  return (
    <div className="my-32" id="reviews">
      <h1 className="text-3xl font-semibold leading-[60px] mb-[74px] text-center">What my students have to say!</h1>
      <div className="grid grid-cols-2 gap-[20px] items-center">
        <div className="flex flex-col gap-[20px]">
          <ReviewCard title="Aron" body="Aaron is currently helping me to catch up with a full-stack web-developer bootcamp, that was well above my level of knowledge when I started it. But now thankfully to the help, at last I can kind of see the light at the end of the tunnel; I managed to familiarize myself with a lot of the complex concepts involved in programming and I can see that I will eventually get through the challenges involved in starting a career in this field. Aaron is maximally friendly, patient, tries to accommodate the needs of the student and very well versed in the profession of coding. I am very satisfied, absolutely recommended." imageSrc={reviewAron} />
        </div>
        <div className="flex flex-col gap-[20px]">
          <ReviewCard title="Arsen" body="Aaron is a fantastic teacher, demonstrating both depth of knowledge and making content very engaging. Would highly recommend him to anyone diving into web development." imageSrc={reviewArsen} />
          <ReviewCard title="Maurice" body="Aaron is a great tutor. He explains everything patiently in am easy way, giving examples that Actually makes sense. He has a Very calming personality and also helps me understand stuff when I struggle with my English" imageSrc={reviewMo} />
        </div>
      </div>
    </div>
  );
}
