import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { useFormik } from "formik";
import { signUpSchema, signInSchema } from "../../schemas/index.js";
import { useTranslation } from "react-i18next";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../assets/styles/authForm.module.css";
import { navigation } from "../../context/common/navigations";
import { login, register } from "../../API/authentication";
import { AuthContext } from "../../context/AuthContextProvider";

const Login = () => {
  const { t } = useTranslation();
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const signUpHandler = async (values, actions) => {
    actions.resetForm();

    await register(values, setUser);

    navigate(navigation.getHomeUrl());
  };

  const signInHandler = async (values, actions) => {
    actions.resetForm();

    await login({ email: values.email, password: values.password }, setUser);

    navigate(navigation.getHomeUrl());
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
    validationSchema: isSignUp ? signUpSchema : signInSchema,
    onSubmit: (values, actions) => {
      if (isSignUp) {
        signUpHandler(values, actions);
      } else {
        signInHandler(values, actions);
      }
    },
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
