import iconGitHub from "@/../public/icon-github.svg";
import iconLinkedin from "@/../public/icon-linkedin.svg";
import { statics } from "@/static";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mb-[40px] lg:p-[40px] lg:mb-0">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-y-[25px]">
        <div className="flex-1">
          <span>2023 Yarbz Digital Ltd</span>
        </div>
        <div className="flex-1 flex flex-col lg:flex-row items-center justify-center">
          <ul className="flex flex-col lg:flex-row gap-x-[20px] gap-y-[25px] items-center lg:items-start">
            <ul>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </ul>
            <li>
              <Link href="/terms-of-service">Terms of Service</Link>
            </li>
            <li>
              <a href="#">Back to top</a>
            </li>
          </ul>
        </div>
        <div className="flex-1 flex flex-row items-center justify-end">
          <Socials />
        </div>
      </div>
    </footer>
  );
}

function Socials() {
  return (
    <ul className="flex flex-row gap-x-[20px]">
      <li>
        <a href={statics.socialURLs.linkedin} target="_blank" rel="nofollow noopener">
          <Image src={iconLinkedin} alt="linkedin icon" width={32} />
        </a>
      </li>
      <li>
        <a href={statics.socialURLs.gitHub} target="_blank" rel="nofollow noopener">
          <Image src={iconGitHub} alt="github icon" width={32} />
        </a>
      </li>
    </ul>
  );
}
