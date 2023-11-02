import Button from "@/components/tutoring/button";
import Image, { StaticImageData } from "next/image";

import arrow from "@/../public/tutoring/arrow.svg";
import check from "@/../public/tutoring/check.svg";
import heroshot from "@/../public/tutoring/heroshot@2x.png";
import iconThumb from "@/../public/tutoring/icon-thumb.svg";
import iconTutoring from "@/../public/tutoring/icon-tutoring.svg";
import pairProgramming from "@/../public/tutoring/pair-programming@2x.jpg";
import reviewAron from "@/../public/tutoring/review-aron@2x.png";
import reviewArsen from "@/../public/tutoring/review-arsen@2x.png";

import ReviewCard from "@/components/tutoring/review-card";

export default function Home() {
  return (
    <main>
      <div className="container relative mx-auto">
        <div className="relative mx-auto max-w-[1124px]">
          <HeroSection />
          <ServicesSection />
          <AboutMeSection />
          <ReviewsSection />
          <ConsiderTutoringSection />
          <HowItWorksSection />
          <PricingSection />
        </div>
      </div>
    </main>
  );
}

function HeroSection() {
  return (
    <div className="flex flex-row items-center justify-between my-32">
      <div className="max-w-[553px] flex-shrink-0">
        <h1 className="text-3xl font-semibold leading-[64px] mb-[20px]">
          Expert tutoring from a <span className="text-yd-tut-green">software professional</span>
        </h1>
        <p className="leading-[30px] mb-[30px]">I help people learn software development, no matter where they&apos;re starting from. Whether you&apos;re totally new to it, have some experience, or just need a quick intro to a new tech or some code review, I&apos;ve got you covered!</p>

        <div className="flex flex-row gap-x-[21px] items-center">
          <Button theme="green">Book a free trial lesson</Button>
          <Button theme="black">Purchase sessions</Button>
        </div>
      </div>
      <div>
        <Image src={heroshot} alt="Headshot of Aaron" width={515} />
      </div>
    </div>
  );
}

function ServicesSection() {
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

function AboutMeSection() {
  return (
    <div className="my-32">
      <h1 className="text-3xl font-semibold leading-[60px] mb-[74px]">A bit about me...</h1>
      <div className="flex flex-row gap-x-[60px]">
        <div className="col-span-7 prose">
          <p>
            Hey there, I&apos;m Aaron!
            <br />
            <br />
            I&apos;ve got over a decade of experience as a full-stack software engineer, and I&apos;m super excited to tell you a bit about my journey.
            <br />
            <br />I first dipped my toes into programming when I was pretty young, teaching myself how to create content for a niche online game. It was like discovering a whole new world! From there, I went on to teach myself modern software development, picking up languages like JavaScript, C#, and Python, and diving head first into the world of web and desktop applications.
            <br />
            <br />
            I&apos;ve had the chance to work in all sorts of industries &ndash; from FinTech and marketing to the UK public sector and pharmaceuticals. Along the way, I&apos;ve taken on various roles, like Senior Developer, Software Architect, Development Team Lead, and even Project Manager. With all this real-world experience, I&apos;m not just here to teach you how to code; I want to show you how to thrive in the ever-evolving tech scene.
            <br />
            <br />
            Since I&apos;m a self-learner myself, I totally get how to make the most of online resources. Whether you want a structured, step-by-step approach to learning or prefer to dive into specific questions or coding challenges, I&apos;m here to work with your style.
            <br />
            <br />
            🇩🇪 Oh, und wenn du dich lieber auf Deutsch unterhalten, ist das auch kein Problem - wir k&ouml;nnen darauf umsteigen!
            <br />
            <br />
            Thanks for thinking about learning with me, and I&apos;m looking forward to hearing from you soon!
          </p>
        </div>
        <div className="col-span-5 relative">
          <div className="sticky top-[50px]">
            <iframe className="rounded-xl" width="500" height="333" src="https://www.youtube.com/embed/JDs9tFBFif0?si=u70at-f3dnBS8xXc" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

            <h2 className="text-xl font-semibold leading-[65px] mt-[35px]">Technologies I work with</h2>
            <div className="prose prose-tut">
              <ul>
                <li>
                  <span>
                    JavaScript, TypeScript
                    <br />
                  </span>
                </li>
                <li>
                  <span>
                    React, Next.js, Angular, Aurelia
                    <br />
                  </span>
                </li>
                <li>
                  <span>
                    WordPress, Umbraco, Sitecore
                    <br />
                  </span>
                </li>
                <li>
                  <span>
                    Tailwindcss, CSS, SASS, LESS
                    <br />
                  </span>
                </li>
                <li>
                  <span>
                    nodejs, Python
                    <br />
                  </span>
                </li>
                <li>
                  <span>
                    C#, ASP.NET
                    <br />
                  </span>
                </li>
                <li>
                  <span>
                    SQL Server, MySQL, MongoDB
                    <br />
                  </span>
                </li>
                <li>
                  <span>
                    AWS, GCP, Azure, DigitalOcean
                    <br />
                  </span>
                </li>
                <li>
                  <span>GitHub, GitLab</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewsSection() {
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

function ConsiderTutoringSection() {
  const points = ["Increase your value in digital work environments by understanding the technical aspects of your product or service", "Develop valuable technical problem-solving skills ", "Open doors to new career opportunities by learning from an experienced professional who has done the hard work for you!"];

  return (
    <div className="my-32">
      <div className="flex flex-row items-center gap-x-[57px]">
        <div>
          <Image src={pairProgramming} alt="Image of a pair of programmers working together." width={601} />
        </div>
        <div className="max-w-[473px]">
          <h1 className="text-3xl font-semibold leading-[60px] mb-[13px]">Why should I consider tutoring?</h1>
          <p className="mb-[25px] leading-[30px]">Tutoring is a great way to get fast, quality advice from experts efficiently without developing bad habits or wasting your time on unnecessary things, as well as:</p>
          <div className="flex flex-col gap-y-[17px]">
            {points.map((point, i) => (
              <div key={i} className="flex flex-row gap-x-[9px] items-start">
                <Image src={check} alt="" className="mt-[6px]" />
                <p>{point}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HowItWorksSection() {
  return (
    <div className="my-32">
      <h1 className="text-3xl font-semibold leading-[60px] mb-[62px]">How it works</h1>
      <div className="flex flex-row gap-x-[66px] items-center">
        <div className="max-w-[260px]">
          <h2 className="text-lg font-semibold mb-[27px]">Step 1</h2>
          <p className="text-2xl font-semibold leading-[50px]">Buy individual lessons or start a subscription</p>
        </div>

        <Image src={arrow} alt="" />

        <div className="max-w-[260px]">
          <h2 className="text-lg font-semibold mb-[27px]">Step 2</h2>
          <p className="text-2xl font-semibold leading-[50px]">Book your sessions into my calendar</p>
        </div>

        <Image src={arrow} alt="" />

        <div className="max-w-[260px]">
          <h2 className="text-lg font-semibold mb-[27px]">Step 3</h2>
          <p className="text-2xl font-semibold leading-[50px]">Attend the session and learn!</p>
        </div>
      </div>
    </div>
  );
}

function PricingSection() {
  return (
    <div className="my-32">
      <h1 className="text-3xl font-semibold leading-[60px] mb-[62px]">Pricing</h1>
      <div className="grid grid-cols-3 gap-x-[76px]">
        <div></div>
      </div>
    </div>
  );
}
