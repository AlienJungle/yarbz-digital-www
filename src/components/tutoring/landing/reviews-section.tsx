import ReviewCard from "../review-card";

import reviewAron from "@/../public/tutoring/review-aron@2x.png";
import reviewArsen from "@/../public/tutoring/review-arsen@2x.png";
import reviewTess from "@/../public/tutoring/review-tess.png";
import TypedTextAnimation from "@/components/animation/typed-text-animation";
import { introBurstIn } from "@/lib/animations";
import * as motion from "@/lib/motion";
import { PropsWithChildren } from "react";

export default function ReviewsSection() {
  const ReviewCardAnimated = ({ children }: PropsWithChildren) => {
    return <motion.div variants={introBurstIn}>{children}</motion.div>;
  };

  return (
    <div className="landing-section" id="reviews">
      <h1 className="mb-[34px] lg:mb-[74px] lg:text-center">
        <TypedTextAnimation text="What my students have to say!" />
      </h1>
      <motion.div
        className="grid md:grid-cols-2 gap-[20px] items-center"
        initial="hidden"
        whileInView={"visible"}
        viewport={{ once: true }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.3,
            },
          },
        }}
      >
        <motion.div className="flex flex-col gap-[25px] lg:gap-[20px]">
          <ReviewCardAnimated>
            <ReviewCard title="Aron" body="Aaron is currently helping me to catch up with a full-stack web-developer bootcamp, that was well above my level of knowledge when I started it. But now thankfully to the help, at last I can kind of see the light at the end of the tunnel; I managed to familiarize myself with a lot of the complex concepts involved in programming and I can see that I will eventually get through the challenges involved in starting a career in this field. Aaron is maximally friendly, patient, tries to accommodate the needs of the student and very well versed in the profession of coding. I am very satisfied, absolutely recommended." imageSrc={reviewAron} />
          </ReviewCardAnimated>
        </motion.div>
        <motion.div className="flex flex-col gap-[20px]">
          <ReviewCardAnimated>
            <ReviewCard title="Arsen" body="Aaron is a fantastic teacher, demonstrating both depth of knowledge and making content very engaging. Would highly recommend him to anyone diving into web development." imageSrc={reviewArsen} />
          </ReviewCardAnimated>
          <ReviewCardAnimated>
            <ReviewCard title="Tess" body="Aaron helped me with a beginners coding course which I was struggling through for work. Aaron is very modest, but he’s technically exceptional at what he does and he’s also a great teacher. He’s able to break concepts down and explain things multiple ways until it clicks. He is patient and approachable, so I felt that I could ask questions and say if I needed to recap something. He was able to tailor the sessions to my world of work so that the content was applied and relevant. I would recommend Aaron’s tutoring for absolute beginners right through to more advanced developers in need of mentoring." imageSrc={reviewTess} />
          </ReviewCardAnimated>
        </motion.div>
      </motion.div>
    </div>
  );
}
