import { calendar_v3 } from "googleapis";

export default function useFreeBusy() {
  const getFreeBusyOnDate = async (date: string): Promise<calendar_v3.Schema$TimePeriod[]> => {
    return (await fetch(`/api/calendars/freebusy/${date}`)).json();
  };

  return {
    getFreeBusyOnDate,
  };
}
