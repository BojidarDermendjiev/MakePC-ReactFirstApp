import { useFormik } from "formik";
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { basicSchema } from "../../schemas";
import { AuthContext } from "../../context/AuthContext";
import styles from "../../assets/styles/authForm.module.css";

const Login = () => {
  const { t } = useTranslation();
  const { isSignUp, toggleForm } = useContext(AuthContext);

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
              <>
                <input
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  type="text"
                  placeholder={t("authenticator.name")}
                  onBlur={handleBlur}
                  className={
                    errors.name && touched.name ? styles["input-error"] : ""
                  }
                />
                {errors.name && touched.name && (
                  <p className={styles.error}>{errors.name}</p>
                )}
                <input
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  type="email"
                  placeholder={t("authenticator.email")}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email ? styles["input-error"] : ""
                  }
                />
                {errors.email && touched.email && (
                  <p className={styles.error}>{errors.email}</p>
                )}
                <input
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  type="password"
                  placeholder={t("authenticator.password")}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password
                      ? styles["input-error"]
                      : ""
                  }
                />
                {errors.password && touched.password && (
                  <p className={styles.error}>{errors.password}</p>
                )}
                <input
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  type="password"
                  placeholder={t("authenticator.confirmPassword")}
                  onBlur={handleBlur}
                  className={
                    errors.confirmPassword && touched.confirmPassword
                      ? styles["input-error"]
                      : ""
                  }
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <p className={styles.error}>{errors.confirmPassword}</p>
                )}
                <button
                  className={styles.signUp}
                  disabled={isSubmitting}
                  type="submit"
                >
                  {t("authenticator.signUp")}
                </button>
              </>
            ) : (
              <>
                <input
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  type="email"
                  placeholder={t("authenticator.email")}
                  onBlur={handleBlur}
                  required
                />
                <input
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  type="password"
                  placeholder={t("authenticator.password")}
                  onBlur={handleBlur}
                  required
                />
                <Link to="#">{t("authenticator.forgetPassword")}</Link>
                <button type="submit">{t("authenticator.signIn")}</button>
              </>
            )}
          </form>
        </div>

        <div className={styles["toggle-container"]}>
          <div className={styles.toggle}>
            <div
              className={`${styles["toggle-panel"]} ${
                isSignUp ? styles["toggle-left"] : styles["toggle-right"]
              }`}
              onClick={() => toggleForm(!isSignUp)}
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
                onClick={() => toggleForm(!isSignUp)}
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
              <Link to="#" onClick={() => toggleForm(false)}>
                {t("authenticator.signInHere")}
              </Link>
              .
            </p>
          ) : (
            <p>
              {t("authenticator.dontHaveAccount")}{" "}
              <Link to="#" onClick={() => toggleForm(true)}>
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
