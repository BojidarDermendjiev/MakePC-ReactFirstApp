import { useTranslation } from "react-i18next";
import styles from "../../assets/styles/authForm.module.css";

const SignUp = ({
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
        name="FullName"
        value={values.FullName}
        onChange={handleChange}
        type="text"
        placeholder={t("authenticator.name")}
        onBlur={handleBlur}
        className={
          errors.FullName && touched.FullName ? styles["input-error"] : ""
        }
        required
      />
      {errors.FullName && touched.FullName && (
        <p className={styles.error}>{errors.FullName}</p>
      )}
      <input
        name="Email"
        value={values.Email}
        onChange={handleChange}
        type="email"
        placeholder={t("authenticator.email")}
        onBlur={handleBlur}
        className={errors.Email && touched.Email ? styles["input-error"] : ""}
        required
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
        className={
          errors.Password && touched.Password ? styles["input-error"] : ""
        }
        required
      />
      {errors.Password && touched.Password && (
        <p className={styles.error}>{errors.Password}</p>
      )}
      <input
        name="ConfirmPassword"
        value={values.ConfirmPassword}
        onChange={handleChange}
        type="password"
        placeholder={t("authenticator.confirmPassword")}
        onBlur={handleBlur}
        className={
          errors.ConfirmPassword && touched.ConfirmPassword
            ? styles["input-error"]
            : ""
        }
        required
      />
      {errors.ConfirmPassword && touched.ConfirmPassword && (
        <p className={styles.error}>{errors.ConfirmPassword}</p>
      )}
      <button
        className={styles.signUp}
        disabled={isSubmitting}
        aria-label="authenticator.signUp"
        type="submit"
      >
        {t("authenticator.signUp")}
      </button>
    </>
  );
};

export default SignUp;
