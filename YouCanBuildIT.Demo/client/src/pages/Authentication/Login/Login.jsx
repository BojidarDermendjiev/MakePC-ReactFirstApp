import { useFormik } from "formik";
import { Link, Router } from "react-router-dom";
import { basicSchema } from "../../../schemas";
import styles from "../../../assets/styles/authForm.module.css";

const Login = () => {
  // Handle form submission
  const onSubmit = async (values, actions) => {
    console.log("submitted");
    console.log(values);
    console.log(actions);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
  };

  const goToRegisterPage = () => {
    Router.push("/register");
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
      <div className={`${styles.container}`}>
        <div className={`${styles["form-container"]} ${styles["sign-in"]}`}>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <h1>Sign In</h1>

            <span>or use your email for registration</span>

            <input
              name="email"
              value={values.email}
              onChange={handleChange}
              type="email"
              placeholder="Email"
              onBlur={handleBlur}
              required
            />
            <input
              name="password"
              value={values.password}
              onChange={handleChange}
              type="password"
              placeholder="Password"
              onBlur={handleBlur}
              required
            />
            <Link to="#">Forget Your Password?</Link>
            <button type="submit">Sign In</button>
          </form>
        </div>

        <div className={styles["toggle-container"]}>
          <div className={styles.toggle}>
            <div
              className={`${styles["toggle-panel"]} ${styles["toggle-right"]}`}
              onClick={goToRegisterPage}
            >
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button
                className={styles.hidden}
                id={"register"}
                onClick={goToRegisterPage}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>

        <div className={styles["account-info"]}>
          <p>
            Don't have an account?{" "}
            <a href="#" onClick={goToRegisterPage}>
              Sign Up here
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
