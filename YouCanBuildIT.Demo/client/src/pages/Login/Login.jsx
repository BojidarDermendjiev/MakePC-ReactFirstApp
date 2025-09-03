import React, { useState, useContext, useEffect } from "react";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { signUpSchema, signInSchema } from "../../schemas/index.js";
import styles from "../../assets/styles/authForm.module.css";
import { navigation } from "../../common/navigations";
import { login } from "../../api/authentication.js";
import { AuthContext } from "../../context/AuthContextProvider";
import InvalidPassOrEmailModal from "../Login/InvalidPassOrEmail.jsx";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { setUser } = useContext(AuthContext);
  const [showInvalidModal, setShowInvalidModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(location.pathname === "/register");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isActive, setIsActive] = useState(location.pathname === "/register");

  useEffect(() => {
    setIsSignUp(location.pathname === "/register");
    setIsActive(location.pathname === "/register");
  }, [location.pathname]);

  const handleSwitchToSignUp = () => {
    setIsTransitioning(true);
    setIsActive(true);
    setTimeout(() => {
      setIsSignUp(true);
      setIsTransitioning(false);
      navigate(navigation.getRegisterUrl());
    }, 650);
  };

  const signInHandler = async (values, actions) => {
    try {
      actions.resetForm();
      await login(
        {
          Email: values.Email,
          Password: values.Password,
        },
        setUser
      );
      navigate(navigation.getHomeUrl());
    } catch (error) {
      actions.setFieldError("Email", error.message);
      setShowInvalidModal(true);
    }
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
      Email: "",
      Password: "",
    },
    validationSchema: signInSchema,
    onSubmit: (values, actions) => {
      signInHandler(values, actions);
    },
  });

  return (
    <section className={styles.formInput}>
      <div
        className={`${styles.container} ${isActive ? styles.active : ""} ${isTransitioning ? styles.transitioning : ""}`}
      >
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
                className={`${styles.hidden} ${styles["auth-button"]}`}
                id={isSignUp ? "login" : "register"}
                onClick={handleSwitchToSignUp}
              >
                {isSignUp
                  ? t("authenticator.signIn")
                  : t("authenticator.signUp")}
              </button>
            </div>
          </div>
        </div>
      </div>
      <InvalidPassOrEmailModal
        show={showInvalidModal}
        onClose={() => setShowInvalidModal(false)}
      />
    </section>
  );
};

export default Login;
