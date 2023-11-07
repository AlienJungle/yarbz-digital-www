"use client";

import BackButton from "@/components/back-button";
import { UserContext } from "@/components/providers/user-provider";
import Button from "@/components/tutoring/button";
import useFreeBusy from "@/lib/useFreeBusy";
import useSessions from "@/lib/useSessions";
import { add, areIntervalsOverlapping, format } from "date-fns";
import { Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import { ChangeEvent, useContext, useEffect, useState } from "react";

interface BookSessionValues {
  date: string | undefined;
  time: string | undefined;
  duration: string | undefined;
  message: string | undefined;
}

interface SelectOption<T> {
  label: string;
  value: T;
  disabled?: boolean;
}

export default function BookSessionPage() {
  const userCtx = useContext(UserContext);
  const currentUser = userCtx.currentUser;

  const router = useRouter();
  const { getFreeBusyOnDate } = useFreeBusy();
  const { bookSession } = useSessions(userCtx.currentUser!.uid);

  const [dates, setDates] = useState<Date[]>([]);
  const [times, setTimes] = useState<SelectOption<Date>[]>([]);
  const [durations] = useState<SelectOption<number>[]>([
    {
      label: "30 minutes",
      value: 30,
    },
    {
      label: "60 minutes",
      value: 60,
    },
    {
      label: "90 minutes",
      value: 90,
    },
  ]);
  const [loadingTimes, setLoadingTimes] = useState<boolean>(false);

  useEffect(() => {
    const now = new Date();

    setDates(
      [...Array(14)].map((_, i) => {
        return add(now, { days: i + 1 }); // +1 offsets by 24 hours
      }),
    );
  }, []);

  const handleBookingSubmit = async (values: BookSessionValues, helpers: FormikHelpers<BookSessionValues>) => {
    try {
      await bookSession({
        start_date: values.time!,
        duration_minutes: parseInt(values.duration!),
        message: values.message ?? "",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      });

      router.push("/tutoring/dashboard?bookedsession=true");
    } catch (error: any) {
      console.error(error);
      alert("An error occurred while booking your session: " + error?.message ?? error);
    }
  };

  return (
    <main>
      <div className="container mx-auto my-20 !max-w-[900px]">
        <BackButton href="/tutoring/dashboard" text="Back to dashboard" />
        <h1 className="text-3xl font-semibold my-10">Book a session</h1>

        <p className="my-6">
          You have <strong>{currentUser!.available_sessions ?? 0} sessions</strong> left to book.
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
            const errors = {} as any;
            if (!values.date) {
              errors.date = "You must select a date.";
            }

            if (!values.time) {
              errors.time = "You must select a time.";
            }

            if (!values.duration) {
              errors.duration = "You must select a duration";
            }

            return errors;
          }}
        >
          {({ values, handleSubmit, handleChange, handleBlur, isValid, errors, setFieldValue, isSubmitting }) => {
            const handleDurationChange = async (e: ChangeEvent<HTMLSelectElement>) => {
              handleChange(e);
              if (e.currentTarget.value && values.date) {
                updateTimeSlots(parseInt(e.currentTarget.value), values.date);
              }
            };

            const handleDateChange = async (e: ChangeEvent<HTMLSelectElement>) => {
              handleChange(e);
              if (e.currentTarget.value && values.duration) {
                updateTimeSlots(parseInt(values.duration), e.currentTarget.value);
              }
            };

            const updateTimeSlots = async (durationValue: number, dateValue: string) => {
              const date = new Date(dateValue);

              setTimes([]);
              setLoadingTimes(true);
              const busySlots = await getFreeBusyOnDate(dateValue, Intl.DateTimeFormat().resolvedOptions().timeZone);
              setLoadingTimes(false);

              const fromDateTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 9);
              const toDateTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 22);

              const timeSlots: SelectOption<Date>[] = [];

              let startDate = fromDateTime;
              while (startDate <= toDateTime) {
                const endDate = add(startDate, { minutes: durationValue });
                // Only add event to list if the end time doesn't exceed
                // the end time specified
                if (endDate <= toDateTime) {
                  timeSlots.push({
                    label: format(startDate, "p"),
                    value: startDate,
                    disabled: busySlots.some((bs) => {
                      const bsStart = new Date(bs.start!);
                      const bsEnd = new Date(bs.end!);

                      return areIntervalsOverlapping(
                        {
                          start: bsStart,
                          end: bsEnd,
                        },
                        {
                          start: startDate,
                          end: endDate,
                        },
                      );
                    }),
                  });
                }
                startDate = add(startDate, { minutes: 15 });
              }

              setTimes(timeSlots);
            };

            return (
              <form className="flex flex-col gap-y-[30px]" onSubmit={handleSubmit}>
                <div className="flex flex-row gap-x-[30px]">
                  <div className="flex-1">
                    <label htmlFor="duration">Duration</label>
                    <select id="duration" name="duration" required className="tut-form-control" onChange={handleDurationChange} onBlur={handleBlur}>
                      <option value={undefined}>-- Select a duration --</option>
                      {durations.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.duration && <span className="yd-form-error">{errors.duration}</span>}
                  </div>
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
                    <select id="time" name="time" required className="tut-form-control" onChange={handleChange} disabled={!values.date || loadingTimes}>
                      <option value={undefined}>
                        {loadingTimes && "Getting times..."}
                        {!loadingTimes && "-- Select a time --"}
                      </option>
                      {times.map((option) => (
                        <option key={option.value.toISOString()} value={option.value.toISOString()} disabled={option.disabled}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.time && <span className="yd-form-error">{errors.time}</span>}
                  </div>
                </div>

                <div>
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" className="w-full tut-form-control block" placeholder="This session, I want to focus on..." maxLength={1000} rows={5} value={values.message} onChange={handleChange} onBlur={handleBlur} />
                </div>

                <div className="flex flex-row justify-end">
                  <Button theme="green" type="submit" disabled={!isValid || isSubmitting}>
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
