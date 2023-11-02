"use client";

import BackButton from "@/components/back-button";
import { add, format } from "date-fns";
import { useEffect, useState } from "react";

interface BookSessionValues {
  date: string;
  time: string;
  duration: 30 | 60 | 90;
}

export default function BookSessionPage() {
  const [dates, setDates] = useState<Date[]>([]);
  const [times, setTimes] = useState<string[]>([]);

  useEffect(() => {
    const now = new Date();

    setDates(
      [...Array(14)].map((_, i) => {
        return add(now, { days: i + 1 }); // +1 offsets by 24 hours
      }),
    );
  }, []);

  const handleDateSelect = () => {
    setTimes(["09:00"]);
  };

  return (
    <main>
      <div className="container mx-auto my-20">
        <BackButton href="/tutoring/dashboard" text="Back to dashboard" />
        <h1 className="text-3xl font-semibold my-10">Book a session</h1>

        <p className="my-6">
          You have <strong>0 sessions</strong> left to book.
        </p>

        <div className="flex flex-row gap-x-[30px]">
          <div>
            <h2>Date</h2>
            <select className="tut-form-control" onChange={handleDateSelect}>
              <option value={undefined}>-- Select a date --</option>
              {dates.map((date) => (
                <option key={date.getTime()} value={date.toISOString()}>
                  {format(date, "eee, PPP")}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h2>Time</h2>
            <select className="tut-form-control">
              {times.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </main>
  );
}
