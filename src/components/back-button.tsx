import classNames from "classnames";
import Link from "next/link";

interface BackButtonProps {
  text: string;
  href: string;
  className?: string;
}

export default function BackButton({ text, className, href }: BackButtonProps) {
  return (
    <Link href={href} className={classNames("block mb-3", className)}>
      &lt; {text}
    </Link>
  );
}
