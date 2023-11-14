/* eslint-disable react-hooks/rules-of-hooks */

import { Session } from "@/app/api/_models/session";
import { add } from "date-fns";
import useSWR from "swr";
import { fetcher } from "./swr";

export default function useSessions(userUid: string) {
  const bookSession = async (
    session: Pick<
      Session,
      "start_date" | "duration_minutes" | "message" | "timezone"
    >,
  ) => {
    return await fetch(`/api/users/${userUid}/sessions`, {
      method: "POST",
      body: JSON.stringify(session),
    });
  };

  const getUpcomingSessions = () => {
    const { data, isLoading, error } = useSWR<Session[], Error>(
      `/api/users/${userUid}/sessions`,
      fetcher,
    );

    const now = new Date();

    return {
      sessions: data?.filter((session) => new Date(session.start_date) > now),
      isLoading,
      error,
    };
  };

  const getPreviousLessons = () => {
    const { data, isLoading, error } = useSWR<Session[], Error>(
      `/api/users/${userUid}/sessions`,
      fetcher,
    );

    const now = new Date();

    return {
      sessions: data?.filter((session) => {
        const startDate = new Date(session.start_date);
        const endDate = add(startDate, { minutes: session.duration_minutes });
        return now > endDate;
      }),
      isLoading,
      error,
    };
  };

  const getSession = (sessionUid: string) => {
    const { data, isLoading, error } = useSWR<Session, Error>(
      `/api/users/${userUid}/sessions/${sessionUid}`,
      fetcher,
    );

    return {
      session: data,
      isLoading,
      error,
    };
  };

  const updateSession = async (
    sessionUid: string,
    updatedSession: Partial<Session>,
  ) => {
    return await fetch(`/api/users/${userUid}/sessions/${sessionUid}`, {
      method: "PATCH",
      body: JSON.stringify(updatedSession),
    });
  };

  const cancelSession = (sessionUid: string | undefined) => {
    const { data, isLoading, error } = useSWR<any, Error>(
      () =>
        sessionUid ? `/api/users/${userUid}/sessions/${sessionUid}` : null,
      (url: string) =>
        fetcher(url, {
          method: "DELETE",
        }),
    );

    return {
      data,
      isLoading,
      error,
    };
  };

  return {
    bookSession,
    getUpcomingSessions,
    getPreviousLessons,
    getSession,
    updateSession,
    cancelSession,
  };
}
