import React, { useState, useContext, useEffect, useRef } from "react";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import SignUp from "./SignUp.jsx";
import { signUpSchema } from "../../schemas/index.js";
import styles from "../../assets/styles/authForm.module.css";
import { register } from "../../api/authentication.js";
import { AuthContext } from "../../context/AuthContextProvider.jsx";
import AlreadyExist from "./AlreadyExist.jsx";
import { navigation } from "../../common/navigations.js";
import { TURNSTILE_SITE_KEY, TURNSTILE_THEME } from "../../config/turnstile";

const Register = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setUser } = useContext(AuthContext);
  const [showUserExistsModal, setShowUserExistsModal] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef(null);
  const turnstileWidgetId = useRef(null);

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

    if (window.turnstile) {
      loadTurnstile();
    } else {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.onload = loadTurnstile;
      document.head.appendChild(script);
    }

    return () => {
      if (turnstileWidgetId.current && window.turnstile) {
        window.turnstile.remove(turnstileWidgetId.current);
        turnstileWidgetId.current = null;
      }
    };
  }, []);

  const handleSwitchToSignIn = () => {
    setIsActive(false);
    setTimeout(() => {
      navigate(navigation.getLoginUrl());
    }, 650);
  };

  const signUpHandler = async (values, actions) => {
    try {
      actions.resetForm();
      await register(
        {
          FullName: values.FullName,
          Email: values.Email,
          Password: values.Password,
          ConfirmPassword: values.ConfirmPassword,
          TurnstileToken: turnstileToken,
        },
        setUser
      );
      navigate(navigation.getHomeUrl());
    } catch (error) {
      console.log("REGISTER ERROR:", error.message);
      actions.setFieldError("Email", error.message);
      setShowUserExistsModal(true);
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
      FullName: "",
      Email: "",
      Password: "",
      ConfirmPassword: "",
    },
    validationSchema: signUpSchema,
    onSubmit: signUpHandler,
  });

  return (
    <section className={styles.formInput}>
      <div className={`${styles.container} ${isActive ? styles.active : ""}`}>
        <div className={`${styles["form-container"]} ${styles["sign-up"]}`}>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <h1>{t("authenticator.createAccount")}</h1>
            <span>{t("authenticator.useEmailForRegistration")}</span>
            {/* Cloudflare Turnstile widget */}
            <div
              ref={turnstileRef}
              style={{ margin: "16px 0", display: "flex", justifyContent: "center" }}
            ></div>
            <SignUp
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              handleBlur={handleBlur}
              values={values}
              errors={errors}
              touched={touched}
              isSubmitting={isSubmitting}
            />
          </form>
        </div>
        <div className={styles["toggle-container"]}>
          <div className={styles.toggle}>
            <div
              className={`${styles["toggle-panel"]} ${styles["toggle-left"]}`}
            >
              <h1>{t("authenticator.welcomeBack")}</h1>
              <p>{t("authenticator.enterDetails")}</p>
              <button
                className={`${styles.hidden} ${styles["auth-button"]}`}
                id="login"
                onClick={handleSwitchToSignIn}
                type="button"
              >
                {t("authenticator.signIn")}
              </button>
            </div>
          </div>
        </div>
        <div className={styles["account-info"]}>
          <p>
            {t("authenticator.alreadyHaveAccount")}{" "}
            <Link to="#" onClick={handleSwitchToSignIn}>
              {t("authenticator.signInHere")}
            </Link>
            .
          </p>
        </div>
      </div>
      <AlreadyExist
        show={showUserExistsModal}
        onClose={() => setShowUserExistsModal(false)}
      />
    </section>
  );
};

export default Register;
