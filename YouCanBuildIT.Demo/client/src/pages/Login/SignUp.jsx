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

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit();
  };

  return (
    <>
      <input
        name="name"
        value={values.name}
        onChange={handleChange}
        type="text"
        placeholder={t("authenticator.name")}
        onBlur={handleBlur}
        className={errors.name && touched.name ? styles["input-error"] : ""}
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
        className={errors.email && touched.email ? styles["input-error"] : ""}
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
          errors.password && touched.password ? styles["input-error"] : ""
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
        aria-label="authenticator.signUp"
        type="button"
        onClick={onSubmit}
      >
        {t("authenticator.signUp")}
      </button>
    </>
  );
};

export default SignUp;
