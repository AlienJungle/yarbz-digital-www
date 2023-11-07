import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button, { THEME_CLASSNAME_BLACK } from "../button";
import Card from "../card";

interface SessionsCardProps {
  availableSessions: number;
}

export default function SessionsCard(props: SessionsCardProps) {
  const router = useRouter();

  return (
    <Card title="Sessions" className="h-full flex flex-col">
      <p className="flex-grow block">
        You have <strong>{props.availableSessions} sessions</strong> to use.
      </p>

      <div className="flex flex-col gap-y-[10px]">
        {props.availableSessions > 0 && (
          <Button theme="green" onClick={() => router.push("/tutoring/dashboard/book-session")}>
            Book a session
          </Button>
        )}
        <Link href={"/tutoring#pricing"} className={classNames("btn-tut text-center", THEME_CLASSNAME_BLACK)}>
          Buy more sessions
        </Link>
      </div>
    </Card>
  );
}
