
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import SignUp from "../Login/SignUp";
import { signUpSchema } from "../../schemas/index.js";
import styles from "../../assets/styles/authForm.module.css";
import { register } from "../../api/authentication.js";
import { AuthContext } from "../../context/AuthContextProvider";
import AlreadyExist from "../Login/AlreadyExist.jsx";
import { navigation } from "../../common/navigations";

const Register = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setUser } = useContext(AuthContext);
  const [showUserExistsModal, setShowUserExistsModal] = useState(false);
  const [isActive, setIsActive] = useState(true);

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
        },
        setUser
      );
      navigate(navigation.getHomeUrl());
    } catch (error) {
      console.log("REGISTER ERROR:", error.message);
      actions.setFieldError("Email", error.message);
      setShowUserExistsModal(true);
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
