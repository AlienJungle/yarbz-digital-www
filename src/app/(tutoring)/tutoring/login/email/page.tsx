"use client";

import BackButton from "@/components/back-button";
import CustomLink from "@/components/custom-link";
import Button, { THEME_CLASSNAME_BLACK } from "@/components/tutoring/button";
import * as fbContext from "@/firebase";
import { useCustomRouter } from "@/lib/useCustomRouter";
import classNames from "classnames";
import { FirebaseError } from "firebase/app";
import { UserCredential, signInWithEmailAndPassword } from "firebase/auth";
import { Formik, FormikHelpers } from "formik";

interface LoginEmailValues {
  email: string;
  password: string;
}

export default function LoginEmail() {
  const router = useCustomRouter();

  const handleLoginSubmit = (values: LoginEmailValues, helpers: FormikHelpers<LoginEmailValues>) => {
    signInWithEmailAndPassword(fbContext.auth, values.email, values.password)
      .then((credential: UserCredential) => {
        if (credential.user) {
          router.push("/tutoring/dashboard");
        } else {
          throw "User was not returned in credential.";
        }
      })
      .catch((error) => {
        console.error(JSON.stringify(error));

        const fbError = error as FirebaseError;
        switch (fbError.code) {
          case "auth/invalid-login-credentials":
            alert("The given credentials were invalid. Please ensure you're using the correct username and password, and try again.");

            helpers.resetForm();

            break;
          default:
            alert("Something went wrong: " + fbError.message ?? error);
            break;
        }
      })
      .finally(() => {
        helpers.setSubmitting(false);
      });
  };

  return (
    <main>
      <div className="container mx-auto">
        <div className="max-w-[600px] mx-auto relative my-20">
          <BackButton text="Back to login" href={"/tutoring/login"} />
          <h1 className="text-3xl font-semibold my-[20px]">Student login</h1>

          <Formik<LoginEmailValues>
            initialValues={{
              email: "",
              password: "",
            }}
            validate={(values) => {}}
            onSubmit={handleLoginSubmit}
          >
            {({ handleSubmit, values, errors, isSubmitting, isValid, handleChange, handleBlur }) => {
              return (
                <form onSubmit={handleSubmit} className="flex flex-col gap-y-[30px] my-[40px]">
                  <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" className="tut-form-control" placeholder="john.smith@gmail.com" onChange={handleChange} onBlur={handleBlur} value={values.email} required />
                  </div>
                  <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" className="tut-form-control" onChange={handleChange} onBlur={handleBlur} value={values.password} required />
                  </div>

                  <div className="flex flex-row gap-x-[20px] justify-end">
                    <Button theme={"green"} type="submit" disabled={isSubmitting || !isValid}>
                      Login
                    </Button>
                    <CustomLink preserveQuery={true} href={"/tutoring/forgot-password"} className={classNames("btn-tut", THEME_CLASSNAME_BLACK)}>
                      Forgot password
                    </CustomLink>
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
