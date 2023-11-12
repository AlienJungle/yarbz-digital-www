"use client";

import BackButton from "@/components/back-button";
import * as fbContext from "@/lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { Formik, FormikHelpers } from "formik";

interface ForgotPasswordValues {
  email: string;
}

export default function ForgotPassword() {
  const handleForgotPasswordSubmit = (
    values: ForgotPasswordValues,
    helpers: FormikHelpers<ForgotPasswordValues>,
  ) => {
    sendPasswordResetEmail(fbContext.auth, values.email)
      .then(() => {
        alert(
          "A confirmation email has been send to the email you have provided. Click the link in the email to continue resetting your password.",
        );
      })
      .catch((error) => {
        alert("Something went wrong: " + error.code ?? error);
      })
      .finally(() => {
        helpers.setSubmitting(false);
      });
  };

  return (
    <main>
      <div className="container relative mx-auto">
        <div className="mx-auto relative max-w-[500px] my-20">
          <BackButton text="Back to login" href={"/tutoring/login/email"} />
          <h1 className="text-3xl font-semibold mb-10">Forgot password</h1>
          <p>
            If you have forgotten your password, enter your email below and
            click the &apos;Send forgot password button&apos;. You will be given
            a link that will allow you to reset your password.
          </p>

          <Formik<ForgotPasswordValues>
            initialValues={{ email: "" }}
            onSubmit={handleForgotPasswordSubmit}
          >
            {({
              handleSubmit,
              handleBlur,
              handleChange,
              values,
              errors,
              isSubmitting,
              isValid,
            }) => (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-y-[30px] my-[40px]"
              >
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="tut-form-control"
                    placeholder="john.smith@gmail.com"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    required
                  />
                </div>

                <div className="flex flex-row justify-end">
                  <button
                    type="submit"
                    className="btn-tut bg-yd-tut-green text-yd-tut-black"
                    disabled={isSubmitting || !isValid}
                  >
                    Send forgot password email
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </main>
  );
}
