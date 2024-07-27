import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../assets/styles/authForm.module.css";
import { useFormik } from "formik";
import { basicSchema } from "../../schemas";

const SignUp = () => {
  // State to toggle between Sign Up and Sign In forms
  const [isSignUp, setIsSignUp] = useState(true);

  // State to determine if the user has an account
  const [hasAccount, setHasAccount] = useState(false);

  // Function to toggle between Sign Up and Sign In
  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  // Handle form submission
  const onSubmit = async (values, actions) => {
    console.log("sumbitted");
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
            <h1>{isSignUp ? "Create Account" : "Sign In"}</h1>

            <span>
              {isSignUp
                ? "or use your email for registration"
                : "or use your email account"}
            </span>

            {isSignUp ? (
              <>
                <input
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Name"
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
                  placeholder="Email"
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
                  placeholder="Password"
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
                  placeholder="Confirm Password"
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
                  Sign Up
                </button>
              </>
            ) : (
              <>
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
              onClick={toggleForm}
            >
              <h1>{isSignUp ? "Welcome Back!" : "Hello, Friend!"}</h1>
              <p>
                {isSignUp
                  ? "Enter your personal details to use all of site features"
                  : "Register with your personal details to use all of site features"}
              </p>
              <button
                className={styles.hidden}
                id={isSignUp ? "login" : "register"}
                onClick={toggleForm}
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </div>
          </div>
        </div>

        <div className={styles["account-info"]}>
          {hasAccount ? (
            <p>
              Already have an account?{" "}
              <a href="#" onClick={() => setIsSignUp(false)}>
                Sign In here
              </a>
              .
            </p>
          ) : (
            <p>
              Don't have an account?{" "}
              <a href="#" onClick={() => setIsSignUp(true)}>
                Sign Up here
              </a>
              .
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default SignUp;
