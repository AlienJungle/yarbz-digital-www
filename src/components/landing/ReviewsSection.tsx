import testAverbis from "@/../public/test-averbis.webp";
import testDanD from "@/../public/test-dan-d.jpg";
import testMert from "@/../public/test-mert.webp";
import testPhilS from "@/../public/test-phil-s.jpg";
import { introVariants } from "@/lib/animations";
import * as motion from "@/lib/motion";
import Slider from "../slider";
import Testimonial from "../testimonial";

export default function ReviewsSection(): JSX.Element {
  return (
    <div
      id="testimonials"
      className="landing-section container relative flex flex-col max-w-[998px] items-center"
    >
      <motion.h2
        className="text-3xl text-yd-orange font-semibold text-center max-w-[627px]"
        variants={introVariants}
        initial={"hidden"}
        whileInView={"visible"}
        transition={{
          delay: 0.5,
        }}
        viewport={{ once: true }}
      >
        What those I&apos;ve worked with have to say...
      </motion.h2>
      <motion.div
        className="mt-[60px] max-w-[950px] w-full"
        variants={introVariants}
        initial={"hidden"}
        whileInView={"visible"}
        viewport={{ once: true }}
      >
        <Slider sliderClassName="px-14 lg:px-20" pageClassName="mt-[20px]">
          <Testimonial
            author="Dan Dalton"
            authorImageSrc={testDanD}
            position="Head of Product @ Flock"
            body="Aaron is a passionate, driven and exceptionally talented individual. Not only in his ability as a developer, but in his leadership, accountability and focus. I had the pleasure of woking with Aaron across several projects in our time at Orange Bus. In this time Aaron proved to be a invaluable part of each project team he operated in, from mobile app builds to re-platforming initiatives. Never shying from a challenge, persisting through often pressurised and difficult circumstance and motivating others to follow his example."
          />
          <Testimonial
            author="Phil Smith"
            authorImageSrc={testPhilS}
            position="CTO @ NorthLink Digital"
            body="Aaron is by far one of the most talented and passionate developers I know. Even at the start of his career he had continually outperformed developers many years his senior, and once I had moved away from the company we were both working at, I had to take him with me! Very outgoing & outspoken, able to take a joke, always up for a laugh, and forever working hard to be the best developer possible."
          />
          <Testimonial
            author="Torsten Koller"
            authorImageSrc={testAverbis}
            position="Developer @ Averbis GmbH"
            body="Within our expected timeline, Aaron was successfully able to provide us with a working prototype of our desired application. We perceived him as reliable and diligent and would be happy to work with him again in a future project."
          />
          <Testimonial
            author="Mert Özgül"
            authorImageSrc={testMert}
            position="English Language Teacher"
            body="I hired Aaron to help build our company's image through our website. He has done an immaculate job. He is very easy to work with and cooperative. It was an amazing experience."
          />
        </Slider>
      </motion.div>
    </div>
  );
}
