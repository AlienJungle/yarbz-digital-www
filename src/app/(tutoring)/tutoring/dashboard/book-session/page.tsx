"use client";

import BackButton from "@/components/back-button";
import Button from "@/components/tutoring/button";
import { add, format } from "date-fns";
import { Formik, FormikHelpers } from "formik";
import { ChangeEvent, useEffect, useState } from "react";

interface BookSessionValues {
  date: string | undefined;
  time: string | undefined;
  duration: 30 | 60 | 90 | undefined;
  message: string | undefined;
}

export default function BookSessionPage() {
  const [dates, setDates] = useState<Date[]>([]);
  const [times, setTimes] = useState<string[]>([]);
  const [durations, setDurations] = useState<string[]>([]);

  useEffect(() => {
    const now = new Date();

    setDates(
      [...Array(14)].map((_, i) => {
        return add(now, { days: i + 1 }); // +1 offsets by 24 hours
      }),
    );
  }, []);

  const handleBookingSubmit = (values: BookSessionValues, helpers: FormikHelpers<BookSessionValues>) => {};

  return (
    <main>
      <div className="container mx-auto my-20 !max-w-[900px]">
        <BackButton href="/tutoring/dashboard" text="Back to dashboard" />
        <h1 className="text-3xl font-semibold my-10">Book a session</h1>

        <p className="my-6">
          You have <strong>0 sessions</strong> left to book.
        </p>

        <Formik<BookSessionValues>
          initialValues={{
            date: undefined,
            time: undefined,
            duration: undefined,
            message: undefined,
          }}
          onSubmit={handleBookingSubmit}
          validate={(values) => {
            console.log(values);

            const errors = {} as BookSessionValues;
            if (!values.date) {
              errors.date = "You must select a date.";
            }

            return errors;
          }}
        >
          {({ values, handleSubmit, handleChange, handleBlur, isValid, errors, setFieldValue }) => {
            const handleDateChange = (e: ChangeEvent<any>) => {
              handleChange(e);

              if (e.currentTarget.value) {
                setTimes(["test"]);
                setFieldValue("duration", undefined);
              }
            };

            return (
              <form className="flex flex-col gap-y-[30px]" onSubmit={handleSubmit}>
                <div className="flex flex-row gap-x-[30px]">
                  <div className="flex-1">
                    <label htmlFor="date">Date</label>
                    <select id="date" name="date" className="tut-form-control" onChange={handleDateChange} onBlur={handleBlur}>
                      <option value={""}>-- Select a date --</option>
                      {dates.map((date) => (
                        <option key={date.getTime()} value={date.toISOString()}>
                          {format(date, "eee, PPP")}
                        </option>
                      ))}
                    </select>
                    {errors.date && <span className="yd-form-error">{errors.date}</span>}
                  </div>
                  <div className="flex-1">
                    <label htmlFor="time">Time</label>
                    <select id="time" name="time" required className="tut-form-control" onChange={handleChange} disabled={!values.date}>
                      <option value={undefined}>-- Select a time --</option>
                      {times.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <label htmlFor="duration">Duration</label>
                    <select id="duration" name="duration" required className="tut-form-control" disabled={!values.time || !values.date} onChange={handleChange} onBlur={handleBlur}>
                      <option value={undefined}>-- Select a duration --</option>
                      {durations.map((duration) => (
                        <option key={duration} value={duration}>
                          {duration}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" className="w-full tut-form-control block" placeholder="This lesson, I want to focus on..." maxLength={1000} rows={5} />
                </div>

                <div className="flex flex-row justify-end">
                  <Button theme="green" type="submit">
                    Book session
                  </Button>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </main>
  );
}
