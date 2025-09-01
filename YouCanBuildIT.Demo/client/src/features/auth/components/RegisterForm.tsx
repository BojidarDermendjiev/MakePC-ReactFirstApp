import { useAuth } from "../hooks/useAuth";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { signUpSchema } from "../../../schemas/index.js";
import styles from "../../../assets/styles/authForm.module.css";
import { navigation } from "../../../common/navigations";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { register } = useAuth();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      try {
        await register(values);
        navigate(navigation.getHomeUrl());
      } catch (error) {
        console.error("Registration failed:", error);
      }
    },
  });

  return (
    <div className={styles.authContainer}>
      <form onSubmit={formik.handleSubmit} className={styles.authForm}>
        <h2>{t("authenticator.signUp")}</h2>
        
        <div className={styles.formGroup}>
          <input
            type="text"
            name="fullName"
            placeholder={t("authenticator.name")}
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={formik.errors.fullName && formik.touched.fullName ? styles.error : ""}
          />
          {formik.errors.fullName && formik.touched.fullName && (
            <span className={styles.errorMessage}>{formik.errors.fullName}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <input
            type="email"
            name="email"
            placeholder={t("authenticator.email")}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={formik.errors.email && formik.touched.email ? styles.error : ""}
          />
          {formik.errors.email && formik.touched.email && (
            <span className={styles.errorMessage}>{formik.errors.email}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <input
            type="password"
            name="password"
            placeholder={t("authenticator.password")}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={formik.errors.password && formik.touched.password ? styles.error : ""}
          />
          {formik.errors.password && formik.touched.password && (
            <span className={styles.errorMessage}>{formik.errors.password}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <input
            type="password"
            name="confirmPassword"
            placeholder={t("authenticator.confirmPassword")}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={formik.errors.confirmPassword && formik.touched.confirmPassword ? styles.error : ""}
          />
          {formik.errors.confirmPassword && formik.touched.confirmPassword && (
            <span className={styles.errorMessage}>{formik.errors.confirmPassword}</span>
          )}
        </div>

        <button type="submit" disabled={formik.isSubmitting} className={styles.submitButton}>
          {formik.isSubmitting ? t("common.loading") : t("authenticator.signUp")}
        </button>

        <p className={styles.switchText}>
          {t("authenticator.hasAccount")}
          <Link to={navigation.getLoginUrl()}>{t("authenticator.signIn")}</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;