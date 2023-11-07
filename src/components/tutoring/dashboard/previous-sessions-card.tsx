import Alert from "@/components/alert";
import { UserContext } from "@/components/providers/user-provider";
import useSessions from "@/lib/useSessions";
import { statics } from "@/static";
import classNames from "classnames";
import { format } from "date-fns";
import { useContext } from "react";

export default function PreviousSessionsCard() {
  const userCtx = useContext(UserContext);
  const currUser = userCtx.currentUser;

  const { getPreviousLessons } = useSessions(currUser!.uid);

  const { sessions, error, isLoading } = getPreviousLessons();

  return (
    <div className="card-tut">
      <h2 className="text-xl font-bold mb-[30px]">Your previous sessions {!isLoading && `(${sessions?.length ?? 0})`} </h2>

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
            className={classNames("table-fixed w-full", {
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
                    <td className="flex flex-row justify-end items-center"></td>
                  </tr>
                );
              }) ?? []}
            </tbody>
          </table>
        )}
      </div>

      {error && (
        <Alert type="error" className="mb-[20px]">
          {error.message}
        </Alert>
      )}
    </div>
  );
}
