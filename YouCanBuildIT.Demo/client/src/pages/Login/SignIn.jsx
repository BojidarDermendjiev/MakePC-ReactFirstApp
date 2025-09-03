import React from "react";
import { useTranslation } from "react-i18next";
import styles from "../../assets/styles/authForm.module.css";

const SignIn = ({
  handleSubmit,
  handleChange,
  handleBlur,
  values,
  errors,
  touched,
  isSubmitting,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <input
        name="Email"
        value={values.Email}
        onChange={handleChange}
        type="email"
        placeholder={t("authenticator.email")}
        onBlur={handleBlur}
        required
        className={errors.Email && touched.Email ? styles["input-error"] : ""}
      />
      {errors.Email && touched.Email && (
        <p className={styles.error}>{errors.Email}</p>
      )}
      <input
        name="Password"
        value={values.Password}
        onChange={handleChange}
        type="password"
        placeholder={t("authenticator.password")}
        onBlur={handleBlur}
        required
        className={
          errors.Password && touched.Password ? styles["input-error"] : ""
        }
      />
      {errors.Password && touched.Password && (
        <p className={styles.error}>{errors.Password}</p>
      )}

      <button className={styles.signIn} type="submit" disabled={isSubmitting}>
        {t("authenticator.signIn")}
      </button>
    </>
  );
};

export default SignIn;
