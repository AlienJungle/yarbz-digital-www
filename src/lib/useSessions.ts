import { Session } from "@/app/api/_models/session";

export default function useSessions(uid: string) {
  const bookSession = async (session: Pick<Session, "start_date" | "duration_minutes" | "message">) => {
    return await fetch(`/api/users/${uid}/sessions`, {
      method: "POST",
      body: JSON.stringify(session),
    });
  };

  const getSessions = async () => {
    return (await (await fetch(`/api/users/${uid}/sessions`)).json()) as Session[];
  };

  return { bookSession, getSessions };
}
