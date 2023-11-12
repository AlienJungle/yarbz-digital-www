"use client";

import triangle from "@/../public/tutoring/triangle.svg";
import TypedTextAnimation from "@/components/animation/typed-text-animation";
import { hoverVariant, introBurstIn, tapVariant } from "@/lib/animations";
import * as motion from "@/lib/motion";
import { statics } from "@/static";
import classNames from "classnames";
import Image from "next/image";
import { useState } from "react";
import { THEME_CLASSNAME_GREEN } from "../button";

export default function FAQSection() {
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState<
    { question: string; answer: JSX.Element; isOpen?: boolean }[]
  >([
    {
      question: "Do I need to know at least something before I start tutoring?",
      answer: (
        <>
          Everyone is welcome, regardless of your previous knowledge or
          experience. You don&apos;t have to know a thing about programming
          before joining a session with me. Together, we&apos;ll take things
          step by step, building a strong foundation, and have a great time
          doing it!
        </>
      ),
    },
    {
      question: "Once I start, am I tied in to a contract?",
      answer: (
        <>
          You&apos;re never locked into a contract, and you&apos;re free to stop
          at any time. Please note that sessions purchased with me are
          non-refundable. If you&apos;re on a subscription plan, you can cancel
          it at any time without incurring any extra fees or hidden costs.
        </>
      ),
    },
    {
      question: "How short-notice can I book a session?",
      answer: (
        <>
          You have the flexibility to schedule a session up to 12 hours before
          your desired time, as long as I&apos;m available.
        </>
      ),
    },
    {
      question: "How far in advance can I book a session?",
      answer: <>You can book a session with me up to 2 weeks in advance.</>,
    },
    {
      question: "I can't attend a booked lesson. What do I do?",
      answer: (
        <>
          If you find that you can&apos;t make a lesson, you have the option to
          either reschedule or cancel the lesson, as long as you give me at
          least 4 hours&apos; notice. Unfortunately, lessons cannot be
          rescheduled or canceled within 4 hours of the scheduled start time. To
          reschedule or cancel your lesson, simply log in and visit your
          dashboard. You&apos;ll find the options to do so under &apos;Your
          upcoming lessons&apos;.
        </>
      ),
    },
    {
      question: "Can I purchase tutoring as a business?",
      answer: (
        <>
          Absolutely! If you&apos;re considering offering tutoring in your
          workplace through me, please don&apos;t hesitate to reach out using
          the &apos;I have a question&apos; button below or book a trial lesson
          with me to explore this further. I&apos;m more than happy to provide
          volume discounts if you&apos;re enrolling multiple individuals, and I
          can also provide VAT receipts for your convenience.
        </>
      ),
    },
  ]);

  const handleRowToggle = (i: number) => {
    const arrayUpdated = [...questionsAndAnswers];
    arrayUpdated[i].isOpen = !arrayUpdated[i].isOpen;
    setQuestionsAndAnswers(arrayUpdated);
  };

  return (
    <div className="landing-section" id="faq">
      <h2 className="my-[30px] lg:max-w-[381px] lg:mb-[48px]">
        <TypedTextAnimation text="FAQ" />
      </h2>
      <motion.div
        className="flex flex-col gap-y-[30px]"
        initial="hidden"
        whileInView={"visible"}
        viewport={{ once: true }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {questionsAndAnswers.map((qna, i) => (
          <motion.div
            key={qna.question}
            className="flex flex-col"
            variants={introBurstIn}
          >
            <div
              className="flex flex-row lg:items-center justify-between cursor-pointer gap-x-[20px]"
              onClick={() => handleRowToggle(i)}
              role="button"
            >
              <p className="flex-grow lg:text-lg font-medium">{qna.question}</p>
              <span className="flex-shrink-0 mt-[10px] lg:mt-0">
                <Image
                  src={triangle}
                  alt=""
                  className={classNames({
                    "rotate-180": qna.isOpen,
                  })}
                />
              </span>
            </div>
            {qna.isOpen && <div className="mt-[10px]">{qna.answer}</div>}
          </motion.div>
        ))}
      </motion.div>

      <motion.a
        href={`mailto:${statics.contactEmail}`}
        className={classNames(
          "inline-block btn-tut py-2 mt-[42px]",
          THEME_CLASSNAME_GREEN,
        )}
        initial="hidden"
        whileInView={"visible"}
        variants={introBurstIn}
        viewport={{ once: true }}
        whileTap={tapVariant}
        whileHover={hoverVariant}
      >
        I have a question!
      </motion.a>
    </div>
  );
}
