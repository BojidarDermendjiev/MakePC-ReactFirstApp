import { useAuth } from "../hooks/useAuth";
import { useForm } from "../../../hooks";
import PropTypes from "prop-types";
import "./AuthForm.css";

const AuthForm = ({ mode = "login", onSuccess, className = "" }) => {
  const { login, register } = useAuth();
  const isLogin = mode === "login";

  const initialValues = {
    email: "",
    password: "",
    ...(isLogin ? {} : { fullName: "", confirmPassword: "" }),
  };

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email is invalid";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!isLogin) {
      if (!values.fullName) {
        errors.fullName = "Full name is required";
      }

      if (!values.confirmPassword) {
        errors.confirmPassword = "Please confirm your password";
      } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }
    }

    return errors;
  };

  const handleSubmit = async (values) => {
    const authFunction = isLogin ? login : register;
    const result = await authFunction(values);

    if (result.success) {
      onSuccess?.();
    } else {
      setErrors({ submit: result.error });
    }
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit: onSubmit,
    setErrors,
  } = useForm(initialValues, handleSubmit, validate);

  return (
    <form onSubmit={onSubmit} className={`auth-form ${className}`}>
      <h2>{isLogin ? "Sign In" : "Sign Up"}</h2>

      {!isLogin && (
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            value={values.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            onBlur={() => handleBlur("fullName")}
            className={errors.fullName && touched.fullName ? "error" : ""}
          />
          {errors.fullName && touched.fullName && (
            <span className="error-message">{errors.fullName}</span>
          )}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={values.email}
          onChange={(e) => handleChange("email", e.target.value)}
          onBlur={() => handleBlur("email")}
          className={errors.email && touched.email ? "error" : ""}
        />
        {errors.email && touched.email && (
          <span className="error-message">{errors.email}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={values.password}
          onChange={(e) => handleChange("password", e.target.value)}
          onBlur={() => handleBlur("password")}
          className={errors.password && touched.password ? "error" : ""}
        />
        {errors.password && touched.password && (
          <span className="error-message">{errors.password}</span>
        )}
      </div>

      {!isLogin && (
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={values.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
            onBlur={() => handleBlur("confirmPassword")}
            className={
              errors.confirmPassword && touched.confirmPassword ? "error" : ""
            }
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <span className="error-message">{errors.confirmPassword}</span>
          )}
        </div>
      )}

      {errors.submit && (
        <div className="error-message submit-error">{errors.submit}</div>
      )}

      <button type="submit" disabled={isSubmitting} className="submit-button">
        {isSubmitting ? "Loading..." : isLogin ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

AuthForm.propTypes = {
  mode: PropTypes.oneOf(["login", "register"]),
  onSuccess: PropTypes.func,
  className: PropTypes.string,
};

export default AuthForm;