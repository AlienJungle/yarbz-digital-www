"use client";

import { Session } from "@/app/api/_models/session";
import Alert from "@/components/alert";
import BackButton from "@/components/back-button";
import Container from "@/components/container";
import { UserContext } from "@/components/providers/user-provider";
import Button from "@/components/tutoring/button";
import { getTimeSlots } from "@/helpers/misc-helpers";
import useFreeBusy from "@/lib/useFreeBusy";
import useSessions from "@/lib/useSessions";
import { SelectOption } from "@/models/SelectOption";
import { statics } from "@/static";
import classNames from "classnames";
import { add, format } from "date-fns";
import { Formik, FormikHelpers } from "formik";
import { ChangeEvent, useContext, useEffect, useState } from "react";

interface RescheduleSessionParams {
  params: {
    sessionId: string;
  };
}

export default function RescheduleSessionPage({
  params,
}: RescheduleSessionParams) {
  const userCtx = useContext(UserContext);
  const currentUser = userCtx.currentUser;

  const { getSession, updateSession } = useSessions(currentUser!.uid);

  const {
    session,
    isLoading: getSessionLoading,
    error: getSessionError,
  } = getSession(params.sessionId);

  const handleFormSubmit = async (
    values: RescheduleFormValues,
    formikHelpers: FormikHelpers<RescheduleFormValues>,
  ) => {
    console.log(values);
    try {
      const updatedSession: Partial<Session> = {
        start_date: values.time,
      };

      await updateSession(params.sessionId, updatedSession);
    } catch (error) {
      // TODO: Handle error
    } finally {
      formikHelpers.setSubmitting(false);
    }
  };

  return (
    <main>
      <Container maxWidth={900}>
        <BackButton
          href="/tutoring/dashboard"
          text="Back to dashboard"
        ></BackButton>
        <h1 className="my-10">Reschedule your session</h1>

        {getSessionError ? (
          <Alert className="mb-6" type="error">
            {getSessionError?.message ?? getSessionError}
          </Alert>
        ) : null}

        {!getSessionError && (
          <div>
            <InfoCard
              session={session}
              isLoading={getSessionLoading}
              error={getSessionError}
            />
            <RescheduleForm
              onSubmit={handleFormSubmit}
              currentSession={session}
            />
          </div>
        )}
      </Container>
    </main>
  );
}

function InfoCard(props: {
  session: Session | undefined;
  isLoading: boolean;
  error: Error | undefined;
}) {
  return (
    <div className="shadow-yd-default rounded-lg p-8">
      <h2 className="text-xl mb-6">Your existing session</h2>
      <div
        className={classNames("grid grid-cols-1 md:grid-cols-3 gap-4", {
          skeleton: props.isLoading,
        })}
      >
        <div>
          <p className="font-bold">Date</p>
          <p>
            {props.session?.start_date
              ? format(
                  new Date(props.session!.start_date),
                  statics.dateFormats.date,
                )
              : null}
          </p>
        </div>

        <div>
          <p className="font-bold">Time</p>
          <p>
            {props.session?.start_date
              ? format(
                  new Date(props.session!.start_date),
                  statics.dateFormats.time,
                )
              : null}
          </p>
        </div>

        <div>
          <p className="font-bold">Duration</p>
          <p>
            {props.session?.duration_minutes
              ? `${props.session.duration_minutes} minutes`
              : null}
          </p>
        </div>
      </div>
    </div>
  );
}

interface RescheduleFormProps {
  onSubmit: (
    values: RescheduleFormValues,
    formikHelpers: FormikHelpers<RescheduleFormValues>,
  ) => void;
  currentSession: Session | undefined;
}

interface RescheduleFormValues {
  date: string;
  time: string;
}

function RescheduleForm({
  onSubmit: onFormSubmit,
  currentSession,
}: RescheduleFormProps) {
  const [isLoadingTimes, setIsLoadingTimes] = useState(false);
  const [dates, setDates] = useState<Date[]>([]);
  const [times, setTimes] = useState<SelectOption<Date>[]>([]);

  useEffect(() => {
    const now = new Date();

    setDates(
      [...Array(14)].map((_, i) => {
        return add(now, { days: i + 1 }); // +1 offsets by 24 hours
      }),
    );
  }, []);

  const { getFreeBusyOnDate } = useFreeBusy();

  return (
    <>
      <h2 className="text-xl mt-10 mb-6">New lesson time</h2>
      <Formik<RescheduleFormValues>
        initialValues={{
          date: "",
          time: "",
        }}
        onSubmit={onFormSubmit}
        validate={(values) => {
          const errors = {} as any;
          if (!values.date) {
            errors.date = "You must select a date.";
          }

          if (!values.time) {
            errors.time = "You must select a time.";
          }

          return errors;
        }}
      >
        {({
          values,
          handleBlur,
          handleChange,
          errors,
          isSubmitting,
          isValid,
          handleSubmit,
        }) => {
          const handleDateChange = async (
            e: ChangeEvent<HTMLSelectElement>,
          ) => {
            handleChange(e);
            if (e.currentTarget.value) {
              updateTimeSlots(
                currentSession!.duration_minutes,
                e.currentTarget.value,
              );
            }
          };

          const updateTimeSlots = async (
            durationValue: number,
            dateValue: string,
          ) => {
            setTimes([]);

            setIsLoadingTimes(true);

            const busySlots = await getFreeBusyOnDate(
              dateValue,
              Intl.DateTimeFormat().resolvedOptions().timeZone,
            );

            setIsLoadingTimes(false);

            const timeSlots = await getTimeSlots(
              busySlots,
              durationValue,
              new Date(dateValue),
            );

            setTimes(
              timeSlots.map((ts) => ({
                label: format(ts.date, "p"),
                value: ts.date,
                disabled: !ts.isAvailable,
              })),
            );
          };

          return (
            <form
              className="flex flex-col gap-y-[30px]"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-row gap-x-[30px]">
                <div className="flex-1">
                  <label htmlFor="date">Date</label>
                  <select
                    id="date"
                    name="date"
                    className="tut-form-control"
                    onChange={handleDateChange}
                    onBlur={handleBlur}
                  >
                    <option value={""}>-- Select a date --</option>
                    {dates.map((date) => (
                      <option key={date.getTime()} value={date.toISOString()}>
                        {format(date, "eee, PPP")}
                      </option>
                    ))}
                  </select>
                  {errors.date && (
                    <span className="yd-form-error">{errors.date}</span>
                  )}
                </div>
                <div className="flex-1">
                  <label htmlFor="time">Time</label>
                  <select
                    id="time"
                    name="time"
                    required
                    className="tut-form-control"
                    onChange={handleChange}
                    disabled={!values.date || isLoadingTimes}
                  >
                    <option value={undefined}>
                      {isLoadingTimes && "Getting times..."}
                      {!isLoadingTimes && "-- Select a time --"}
                    </option>
                    {times.map((option) => (
                      <option
                        key={option.value.toISOString()}
                        value={option.value.toISOString()}
                        disabled={option.disabled}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.time && (
                    <span className="yd-form-error">{errors.time}</span>
                  )}
                </div>
              </div>

              <div className="flex flex-row justify-end">
                <Button
                  theme="green"
                  type="submit"
                  disabled={!isValid || isSubmitting}
                >
                  Reschedule session
                </Button>
              </div>
            </form>
          );
        }}
      </Formik>
    </>
  );
}
