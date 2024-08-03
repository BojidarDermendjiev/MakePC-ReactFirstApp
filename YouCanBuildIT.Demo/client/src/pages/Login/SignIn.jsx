import { Link } from "react-router-dom";
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
     
      <button className={styles.signIn} type="submit" >
        {t("authenticator.signIn")}
      </button>
    </>
  );
};

export default SignIn;
