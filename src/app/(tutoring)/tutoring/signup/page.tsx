"use client";

import BackButton from "@/components/back-button";
import * as fbContext from "@/firebase";
import { FirebaseError } from "firebase/app";
import { UserCredential, createUserWithEmailAndPassword } from "firebase/auth";
import { Formik, FormikHelpers } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SignupValues {
  email: string;
  password: string;
  passwordRepeated: string;
}

export default function Signup() {
  const router = useRouter();

  const handleFormSubmit = (values: SignupValues, helpers: FormikHelpers<SignupValues>) => {
    console.log(values, helpers);

    createUserWithEmailAndPassword(fbContext.auth, values.email, values.password)
      .then((userCredential: UserCredential) => {
        const user = userCredential.user;
        if (user) {
          router.push("/tutoring/dashboard");
        } else {
          throw "User was not returned in credential.";
        }
      })
      .catch((error) => {
        console.log(JSON.stringify(error));

        const fbError = error as FirebaseError;
        switch (fbError.code) {
          case "auth/email-already-in-use":
            alert("That email address already exists. Please choose another email address, or log in with your existing credentials.");
            break;

          default:
            alert("Something went wrong: " + fbError ?? error);
        }
      })
      .finally(() => {
        helpers.setSubmitting(false);
      });
  };

  return (
    <main>
      <div className="container relative mx-auto">
        <div className="max-w-[600px] mx-auto relative my-20">
          <BackButton text="Back to login" href={"/tutoring/login"} />
          <h1 className="text-3xl font-semibold">Sign up</h1>
          <p className="leading-[32px] my-[20px]">To get started, create an account by filling in the details below. You&apos;ll be able to use this account to view your upcoming lessons, manage your billing, and book new lessons with me.</p>
          <p className="leading-[32px] my-[20px]">
            Already have an account?{" "}
            <Link href="/tutoring/login" className="font-bold underline">
              Login here!
            </Link>
          </p>
          <Formik<SignupValues>
            initialValues={{
              email: "",
              password: "",
              passwordRepeated: "",
            }}
            validate={(values: SignupValues) => {
              const errors = {} as SignupValues;

              if (values.password !== values.passwordRepeated) {
                errors.passwordRepeated = "Passwords must match!";
              }

              if (values.password.length < 6) {
                errors.password = "Passwords must be at least 6 characters long.";
              }

              return errors;
            }}
            onSubmit={handleFormSubmit}
          >
            {({ handleSubmit, errors, values, isSubmitting, handleChange, handleBlur, isValid }) => {
              return (
                <form onSubmit={handleSubmit} className="flex flex-col gap-y-[30px] my-[40px]">
                  <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" className="tut-form-control" placeholder="john.smith@gmail.com" onChange={handleChange} onBlur={handleBlur} value={values.email} />
                  </div>

                  <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" className="tut-form-control" onChange={handleChange} onBlur={handleBlur} value={values.password} />
                    {errors.password && <span className="yd-form-error">{errors.password}</span>}
                  </div>

                  <div>
                    <label htmlFor="passwordRepeated">Password (repeated)</label>
                    <input type="password" name="passwordRepeated" id="passwordRepeated" className="tut-form-control" onChange={handleChange} onBlur={handleBlur} value={values.passwordRepeated} />
                    {errors.passwordRepeated && <span className="yd-form-error">{errors.passwordRepeated}</span>}
                  </div>

                  <div className="flex flex-row justify-end">
                    <button type="submit" className="btn-tut bg-yd-tut-green text-yd-tut-black" disabled={isSubmitting || !isValid}>
                      Sign up!
                    </button>
                  </div>
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </main>
  );
}
