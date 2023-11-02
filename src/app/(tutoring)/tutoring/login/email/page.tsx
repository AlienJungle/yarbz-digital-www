"use client";

import Button from "@/components/tutoring/button";
import * as fbContext from "@/firebase";
import { FirebaseError } from "firebase/app";
import { UserCredential, signInWithEmailAndPassword } from "firebase/auth";
import { Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";

interface LoginEmailValues {
  email: string;
  password: string;
}

export default function LoginEmail() {
  const router = useRouter();

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
        <div className="max-w-[600px] mx-auto relative">
          <h1 className="text-3xl font-semibold mt-20 mb-10">Login with email & password</h1>

          <Formik<LoginEmailValues>
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={handleLoginSubmit}
          >
            {({ handleSubmit, values, errors, isSubmitting, isValid, handleChange, handleBlur }) => {
              return (
                <form onSubmit={handleSubmit} className="flex flex-col gap-y-[30px] my-[40px]">
                  <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" className="tut-form-control" placeholder="john.smith@gmail.com" onChange={handleChange} onBlur={handleBlur} value={values.email} />
                  </div>
                  <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" className="tut-form-control" onChange={handleChange} onBlur={handleBlur} value={values.password} />
                  </div>

                  <div className="flex flex-row gap-x-[20px] justify-end">
                    <Button theme={"green"} type="submit" disabled={isSubmitting || !isValid}>
                      Login
                    </Button>
                    <Button theme={"black"} type="button">
                      Reset password
                    </Button>
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
