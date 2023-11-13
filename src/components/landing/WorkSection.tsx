import arrowRecentWork from "@/../public/arrow-recent-work@2x.png";
import blobBlue from "@/../public/blob-blue.svg";
import blobOrange from "@/../public/blob-orange.svg";
import workFFF from "@/../public/work-fff.png";
import workNSFGroup from "@/../public/work-nsfgroup.png";
import workRehomeDog from "@/../public/work-rehome-dog.png";
import workSportank from "@/../public/work-sportank.png";
import WorkImage from "@/components/work-image";
import Image from "next/image";
import Slider from "../slider";

export default function WorkSection(): JSX.Element {
  return (
    <div id="work" className="landing-section container relative">
      <Image
        src={blobOrange}
        alt=""
        className="hidden lg:block absolute right-[150px] -top-[150px] -z-10"
      />
      <Image
        src={blobBlue}
        alt=""
        className="hidden lg:block absolute left-[50px] -bottom-[150px] -z-10"
      />

      <div className="lg:max-w-[70%] mx-auto relative">
        <Slider sliderClassName="rounded-xl shadow-yd-default">
          <WorkImage
            imageSrc={workFFF}
            imageAlt="Fifty Five and Five's site redesign, showing a blog page titled how to boost your b2b marketing during a recession."
          />
          <WorkImage
            imageSrc={workSportank}
            imageAlt="Sportank's homepage, showing a collection widgets that offer sign up functionality, as well as fixtures, leagues, and news items."
          />
          <WorkImage
            imageSrc={workRehomeDog}
            imageAlt="NSF Group's sign-in page."
          />
          <WorkImage
            imageSrc={workNSFGroup}
            imageAlt="Newcastle Dog and Cat shelter's re-home a dog page."
          />
        </Slider>

        <Image
          src={arrowRecentWork}
          alt="Arrow with caption 'check out my recent work'"
          className="hidden lg:relative absolute -right-[50px] -bottom-[250px] pointer-events-none"
          width={303}
          height={293}
        />
      </div>
    </div>
  );
}
