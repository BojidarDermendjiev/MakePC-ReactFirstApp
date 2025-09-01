import { useAuth } from "../hooks/useAuth";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { signInSchema } from "../../../schemas/index.js";
import styles from "../../../assets/styles/authForm.module.css";
import { navigation } from "../../../common/navigations";

const LoginForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInSchema,
    onSubmit: async (values) => {
      try {
        await login(values);
        navigate(navigation.getHomeUrl());
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
  });

  return (
    <div className={styles.authContainer}>
      <form onSubmit={formik.handleSubmit} className={styles.authForm}>
        <h2>{t("authenticator.signIn")}</h2>
        
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

        <button type="submit" disabled={formik.isSubmitting} className={styles.submitButton}>
          {formik.isSubmitting ? t("common.loading") : t("authenticator.signIn")}
        </button>

        <p className={styles.switchText}>
          {t("authenticator.noAccount")}
          <Link to={navigation.getRegisterUrl()}>{t("authenticator.signUp")}</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;