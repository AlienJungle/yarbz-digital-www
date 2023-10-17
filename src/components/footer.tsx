import Link from "next/link";

export default function Footer(): JSX.Element {
  return (
    <footer className="grid grid-cols-3 items-center justify-between px-[45px] py-[25px]">
      <span>© 2024 Yarbz Digital Ltd</span>
      <ul className="flex flex-row gap-[15px] items-center justify-center">
        <li>
          <Link href="/privacy-policy" tabIndex={0}>
            Privacy Policy
          </Link>
        </li>
      </ul>
      <div className="text-right">
        <a href="#" tabIndex={0}>
          Back to top
        </a>
      </div>
    </footer>
  );
}
