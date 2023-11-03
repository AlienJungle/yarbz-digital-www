import classNames from "classnames";
import CustomLink from "./custom-link";

interface BackButtonProps {
  text: string;
  href: string;
  className?: string;
}

export default function BackButton({ text, className, href }: BackButtonProps) {
  return (
    <CustomLink href={href} className={classNames("block mb-3", className)} preserveQuery={true}>
      &lt; {text}
    </CustomLink>
  );
}
