"use client";

import { Formik, FormikHelpers } from "formik";

interface ForgotPasswordValues {
  email: string;
}

export default function ForgotPassword() {
  const handleForgotPasswordSubmit = (values: ForgotPasswordValues, helpers: FormikHelpers<ForgotPasswordValues>) => {};
  return (
    <main>
      <div className="container relative mx-auto">
        <div className="mx-auto relative max-w-[500px]">
          <h1 className="text-3xl font-semibold mt-20 mb-10">Forgot password</h1>
          <p>If you have forgotten your password, enter your email below and click the &apos;Send forgot password button&apos;. You will be given a link that will allow you to reset your password.</p>

          <Formik<ForgotPasswordValues> initialValues={{ email: "" }} onSubmit={handleForgotPasswordSubmit}>
            {({ handleSubmit, handleBlur, handleChange, values, errors, isSubmitting, isValid }) => (
              <form onSubmit={handleSubmit} className="flex flex-col gap-y-[30px] my-[40px]">
                <div>
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" id="email" className="tut-form-control" placeholder="john.smith@gmail.com" onChange={handleChange} onBlur={handleBlur} value={values.email} />
                </div>

                <div className="flex flex-row justify-end">
                  <button type="submit" className="btn-tut bg-yd-tut-green text-yd-tut-black" disabled={isSubmitting || !isValid}>
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
