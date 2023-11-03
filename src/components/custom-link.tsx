import { CustomRouterOptions, useCustomRouter } from "@/lib/useCustomRouter";
import Link, { LinkProps } from "next/link";

interface CustomLinkProps extends React.PropsWithChildren<LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>>, Pick<CustomRouterOptions, "preserveQuery"> {}

export default function CustomLink(props: CustomLinkProps) {
  const router = useCustomRouter();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.stopPropagation();
    event.preventDefault();

    router.push(props.href.toString(), { preserveQuery: props.preserveQuery });

    return false;
  };

  const { preserveQuery, ...linkProps } = props;

  return (
    <Link {...linkProps} onClick={handleClick}>
      {props.children}
    </Link>
  );
}
