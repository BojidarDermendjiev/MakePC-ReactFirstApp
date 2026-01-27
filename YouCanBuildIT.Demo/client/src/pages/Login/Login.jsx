import React, { useState, useContext, useEffect, useRef } from "react";
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
import { TURNSTILE_SITE_KEY, TURNSTILE_THEME } from "../../config/turnstile";
import SocialLoginButtons from "../../components/SocialLoginButtons/SocialLoginButtons";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { setUser } = useContext(AuthContext);
  const [showInvalidModal, setShowInvalidModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(location.pathname === "/register");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isActive, setIsActive] = useState(location.pathname === "/register");
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef(null);
  const turnstileWidgetId = useRef(null);

  useEffect(() => {
    setIsSignUp(location.pathname === "/register");
    setIsActive(location.pathname === "/register");
  }, [location.pathname]);

  // Load Turnstile script and render widget
  useEffect(() => {
    const loadTurnstile = () => {
      if (window.turnstile && turnstileRef.current && !turnstileWidgetId.current) {
        turnstileWidgetId.current = window.turnstile.render(turnstileRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: TURNSTILE_THEME,
          callback: (token) => setTurnstileToken(token),
          "expired-callback": () => setTurnstileToken(""),
          "error-callback": () => setTurnstileToken(""),
        });
      }
    };

    // Check if script already loaded
    if (window.turnstile) {
      loadTurnstile();
    } else {
      // Load Turnstile script
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.onload = loadTurnstile;
      document.head.appendChild(script);
    }

    return () => {
      // Cleanup widget on unmount
      if (turnstileWidgetId.current && window.turnstile) {
        window.turnstile.remove(turnstileWidgetId.current);
        turnstileWidgetId.current = null;
      }
    };
  }, []);

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
          TurnstileToken: turnstileToken,
        },
        setUser
      );
      navigate(navigation.getHomeUrl());
    } catch (error) {
      actions.setFieldError("Email", error.message);
      setShowInvalidModal(true);
      // Reset Turnstile on error
      if (window.turnstile && turnstileWidgetId.current) {
        window.turnstile.reset(turnstileWidgetId.current);
      }
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

            {/* Cloudflare Turnstile widget */}
            <div
              ref={turnstileRef}
              style={{ margin: "16px 0", display: "flex", justifyContent: "center" }}
            ></div>

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

            <SocialLoginButtons />
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
