import { Session } from "@/app/api/_models/session";
import Alert from "@/components/alert";
import { UserContext } from "@/components/providers/user-provider";
import useSessions from "@/lib/useSessions";
import { statics } from "@/static";
import classNames from "classnames";
import { add, format } from "date-fns";
import { useContext } from "react";
import Button from "../button";

export default function UpcomingSessionsCard() {
  const userCtx = useContext(UserContext);
  const currUser = userCtx.currentUser;

  const { getUpcomingSessions: getSessions } = useSessions(currUser!.uid);

  const { sessions, error, isLoading } = getSessions();

  return (
    <div className={classNames("card-tut")}>
      <h2 className="text-xl font-bold mb-[30px]">Upcoming sessions {!isLoading && `(${sessions?.length ?? 0})`}</h2>

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
                const startDate = new Date(session.start_date);
                return (
                  <tr key={i} className="items-center">
                    <td>{format(startDate, statics.dateFormats.date)}</td>
                    <td>{format(startDate, statics.dateFormats.time)}</td>
                    <td>{session.duration_minutes} minutes</td>
                    <td className="flex flex-row justify-end items-center">
                      <UpcomingSessionButtons session={session} />
                    </td>
                  </tr>
                );
              }) ?? []}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

interface UpcomingSessionButtonsProps {
  session: Session;
}

function UpcomingSessionButtons({ session }: UpcomingSessionButtonsProps) {
  const now = new Date();
  const startDate = new Date(session.start_date);
  const endDate = add(startDate, { minutes: session.duration_minutes });

  const handleJoinClick = () => {
    window.open(session.meeting_link, "_blank");
  };

  return (
    <div className="flex flex-row items-center gap-x-[10px]">
      <Button theme="black" size="small">
        Reschedule
      </Button>
      <Button theme="black" size="small">
        Cancel
      </Button>
      <Button theme="green" size="small" onClick={handleJoinClick}>
        Join
      </Button>
    </div>
  );
}
