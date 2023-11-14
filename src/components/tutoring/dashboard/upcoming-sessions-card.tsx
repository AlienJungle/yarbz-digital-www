import { Session } from "@/app/api/_models/session";
import Alert from "@/components/alert";
import { UserContext } from "@/components/providers/user-provider";
import { formatDate, formatTime } from "@/helpers/misc-helpers";
import useSessions from "@/lib/useSessions";
import classNames from "classnames";
import { add } from "date-fns";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import Button from "../button";
import Card from "../card";

interface UpcomingSessionsCardProps {
  onCancel: (session: Session) => void;
}

export default function UpcomingSessionsCard({
  onCancel,
}: UpcomingSessionsCardProps) {
  const userCtx = useContext(UserContext);
  const currUser = userCtx.currentUser;

  const { getUpcomingSessions: getSessions } = useSessions(currUser!.uid);

  const { sessions, error, isLoading } = getSessions();

  return (
    <Card>
      <h2 className="text-xl font-bold mb-[30px]">
        Upcoming sessions {!isLoading && `(${sessions?.length ?? 0})`}
      </h2>

      {error && (
        <Alert type="error" className="mb-[20px]">
          {error.message}
        </Alert>
      )}

      <div
        className={classNames({
          skeleton: isLoading,
        })}
      >
        {!sessions?.length && (
          <div>
            <p>Nothing to see here!</p>
          </div>
        )}

        {!!sessions?.length && (
          <table
            className={classNames("table-auto w-full", {
              skeleton: isLoading,
            })}
          >
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Duration</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sessions?.map((session, i) => {
                return (
                  <tr key={i} className="items-center">
                    <td>{formatDate(session.start_date)}</td>
                    <td>{formatTime(session.start_date)}</td>
                    <td>{session.duration_minutes} minutes</td>
                    <td className="flex flex-row justify-end items-center">
                      <UpcomingSessionButtons
                        session={session}
                        onCancel={onCancel}
                      />
                    </td>
                  </tr>
                );
              }) ?? []}
            </tbody>
          </table>
        )}
      </div>
    </Card>
  );
}

interface UpcomingSessionButtonsProps
  extends Pick<UpcomingSessionsCardProps, "onCancel"> {
  session: Session;
}

function UpcomingSessionButtons({
  session,
  onCancel,
}: UpcomingSessionButtonsProps) {
  const startDate = new Date(session.start_date);
  const router = useRouter();

  const now = new Date();
  const endDate = add(startDate, { minutes: session.duration_minutes });

  const handleJoinClick = () => {
    window.open(session.meeting_link, "_blank");
  };

  const handleRescheduleClick = () => {
    router.push(`/tutoring/dashboard/reschedule-session/${session.uid}`);
  };

  const handleCancelClick = () => {
    onCancel(session);
  };

  return (
    <div className="flex flex-row items-center gap-x-[10px]">
      <Button theme="black" size="small" onClick={handleRescheduleClick}>
        Reschedule
      </Button>
      <Button theme="black" size="small" onClick={handleCancelClick}>
        Cancel
      </Button>
      <Button theme="green" size="small" onClick={handleJoinClick}>
        Join
      </Button>
    </div>
  );
}
