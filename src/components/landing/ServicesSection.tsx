import { introVariants } from "@/lib/animations";
import * as motion from "@/lib/motion";
import Image from "next/image";
import TypedTextAnimation from "../animation/typed-text-animation";
import ServiceCard from "../service-card";

import aaron from "@/../public/aaron@2x.png";
import thumbAccessibility from "@/../public/thumb-accessibility.png";
import thumbBespokeDev from "@/../public/thumb-bespoke-dev.png";
import thumbHosting from "@/../public/thumb-hosting.png";

export default function ServicesSection(): JSX.Element {
  return (
    <div className="landing-section container lg:px-[125px] lg:!mb-[400px]">
      <div className="lg:px-[125px] lg:pt-[104px] lg:container faded-bg rounded-[20px] lg:rounded-[50px]">
        <motion.h2
          id="services"
          className="font-semibold text-yd-orange"
          variants={introVariants}
          initial={"hidden"}
          whileInView={"visible"}
          viewport={{ once: true }}
        >
          Services I offer
        </motion.h2>
        <div className="flex flex-col lg:flex-row gap-x-[77px] items-stretch">
          <div className="lg:w-[50%] flex flex-col justify-between">
            <div className="lg:mx-[50px] mt-[25px] lg:mt-[40px]">
              <TypedTextAnimation text="Dive into a decade of software experience with a seasoned freelance engineer. Crafting robust solutions since 2010. Let's turn your ideas into digital marvels together. Explore my services to find out what I can offer!" />
            </div>
            <Image
              src={aaron}
              alt="Headshot of Aaron"
              className="-mt-[150px] pointer-events-none hidden lg:block"
              style={{
                objectFit: "cover",
              }}
            />
          </div>

          <div className="lg:w-[50%] relative flex flex-col gap-y-[25px] lg:gap-y-[46px] justify-start mt-[40px] lg:mb-[80px]">
            <ServiceCard
              imageSrc={thumbBespokeDev}
              imageAlt="a person sitting in front of a computer"
              title={<>Bespoke Software Development</>}
              description={
                <>
                  Turning ideas into reality is my passion. With a decade of
                  experience, I guide projects from concept to reality, whether
                  it&apos;s building{" "}
                  <strong>websites, web applications, or mobile apps</strong>.
                  Need a seasoned developer to bolster your efforts? I&apos;m
                  here for{" "}
                  <strong>
                    spec-writing, prototyping, design, development, and ongoing
                    support.
                  </strong>{" "}
                  Let&apos;s build something shiny and new together!
                </>
              }
            />

            <ServiceCard
              imageSrc={thumbHosting}
              imageAlt="a collection of computer wires"
              title={<>Hosting, Support & Ongoing Maintenance</>}
              description={
                <>
                  From small-scale sites to large-scale platforms, I bring
                  experience to enhance your site&apos;s accessibility up to{" "}
                  <strong>WCAG AAA standards</strong>. Whether you need a{" "}
                  <strong>comprehensive audit</strong> of existing issues or a{" "}
                  <strong>complete accessibility makeover,</strong> I&apos;ve
                  got you covered.
                </>
              }
            />

            <ServiceCard
              imageSrc={thumbAccessibility}
              imageAlt="a suited man writing notes at a desk"
              title={<>Accessibility Audits & Improvements</>}
              description={
                <>
                  Whether it&apos;s providing dedicated support for something
                  we&apos;ve created or taking on the care of an established
                  product, we&apos;ve got your back. We offer{" "}
                  <strong>ongoing maintenance services</strong>, including{" "}
                  <strong>
                    server patching, updates, security reviews, and 24/7 uptime
                    monitoring
                  </strong>
                  . Plus, our hosting options are cost-effective, scalable, and
                  eco-friendly, with servers{" "}
                  <strong>powered entirely by renewable energy.</strong>
                </>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
