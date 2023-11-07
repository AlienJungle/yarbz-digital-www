import { Session } from "@/app/api/_models/session";
import Alert from "@/components/alert";
import { add, format } from "date-fns";
import Button from "../button";

interface UpcomingSessionsCardProps {
  sessions: Session[];
  error?: string;
}

export default function UpcomingSessionsCard({ sessions, error }: UpcomingSessionsCardProps) {
  return (
    <div className="card-tut">
      <h2 className="text-xl font-bold mb-[30px]">Upcoming sessions ({sessions.length})</h2>

      {error && (
        <Alert type="error" className="mb-[20px]">
          {error}
        </Alert>
      )}

      <table className="table-fixed w-full">
        <thead>
          <tr>
            <th>Date</th>
            <th>Duration</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session, i) => (
            <tr key={i} className="items-center">
              <td>{format(new Date(session.start_date), "dd-mm-yyyy")}</td>
              <td>{session.duration_minutes} minutes</td>
              <td className="flex flex-row justify-end items-center">
                <UpcomingSessionButtons session={session} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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

  return (
    <div className="flex flex-row items-center gap-x-[5px]">
      <Button theme="black" size="small">
        Reschedule
      </Button>
      <Button theme="black" size="small">
        Cancel
      </Button>
      {now > startDate && now < endDate && (
        <Button theme="green" size="small">
          Join
        </Button>
      )}
    </div>
  );
}
