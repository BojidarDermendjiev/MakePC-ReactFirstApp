import { useFormik } from "formik";
import { Link, Router } from "react-router-dom";
import { basicSchema } from "../../../schemas";
import styles from "../../../assets/styles/authForm.module.css";

const Register = () => {
  // Handle form submission
  const onSubmit = async (values, actions) => {
    console.log("submitted");
    console.log(values);
    console.log(actions);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
  };

  const goToLoginPage = () => {
    Router.push("/login");
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
    <form autoComplete="off" onSubmit={handleSubmit}>
      <h1>Create Account</h1>

      <span>or use your email for registration</span>

      <input
        name="name"
        value={values.name}
        onChange={handleChange}
        type="text"
        placeholder="Name"
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
        placeholder="Email"
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
        placeholder="Password"
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
      <button className={styles.signUp} disabled={isSubmitting} type="submit">
        Sign Up
      </button>
    </form>
  );
};

export default Register;
