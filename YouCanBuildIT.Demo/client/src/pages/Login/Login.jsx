import React, { useState } from "react";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { basicSchema } from "../../schemas";
import { Link } from "react-router-dom";
import styles from "../../assets/styles/authForm.module.css";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Login = () => {
  const { t } = useTranslation();
  const [isSignUp, setIsSignUp] = useState(false);

  const onSubmit = async (values, actions) => {
    console.log("submitted");
    console.log(values);
    console.log(actions);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: basicSchema,
    onSubmit,
  });

  return (
    <section className={styles.formInput}>
      <div className={`${styles.container} ${isSignUp ? styles.active : ""}`}>
        <div
          className={`${styles["form-container"]} ${
            isSignUp ? styles["sign-up"] : styles["sign-in"]
          }`}
        >
          <form autoComplete="off" onSubmit={handleSubmit}>
            <h1>
              {isSignUp
                ? t("authenticator.createAccount")
                : t("authenticator.signIn")}
            </h1>

            <span>
              {isSignUp
                ? t("authenticator.useEmailForRegistration")
                : t("authenticator.useEmailAccount")}
            </span>

            {isSignUp ? (
              <SignUp
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleBlur={handleBlur}
                values={values}
                errors={errors}
                touched={touched}
                isSubmitting={isSubmitting}
              />
            ) : (
              <SignIn
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleBlur={handleBlur}
                values={values}
                errors={errors}
                touched={touched}
                isSubmitting={isSubmitting}
              />
            )}
          </form>
        </div>

        <div className={styles["toggle-container"]}>
          <div className={styles.toggle}>
            <div
              className={`${styles["toggle-panel"]} ${
                isSignUp ? styles["toggle-left"] : styles["toggle-right"]
              }`}
              onClick={() => setIsSignUp(!isSignUp)}
            >
              <h1>
                {isSignUp
                  ? t("authenticator.welcomeBack")
                  : t("authenticator.helloFriend")}
              </h1>
              <p>
                {isSignUp
                  ? t("authenticator.enterDetails")
                  : t("authenticator.registerDetails")}
              </p>
              <button
                className={styles.hidden}
                id={isSignUp ? "login" : "register"}
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp
                  ? t("authenticator.signIn")
                  : t("authenticator.signUp")}
              </button>
            </div>
          </div>
        </div>

        <div className={styles["account-info"]}>
          {isSignUp ? (
            <p>
              {t("authenticator.alreadyHaveAccount")}{" "}
              <Link to="#" onClick={() => setIsSignUp(false)}>
                {t("authenticator.signInHere")}
              </Link>
              .
            </p>
          ) : (
            <p>
              {t("authenticator.dontHaveAccount")}{" "}
              <Link to="#" onClick={() => setIsSignUp(true)}>
                {t("authenticator.signUpHere")}
              </Link>
              .
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
