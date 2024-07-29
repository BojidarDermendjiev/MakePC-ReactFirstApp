import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { basicSchema } from "../../../schemas";
const Login = () => {
  // Handle form submission
  const onSubmit = async (values, actions) => {
    console.log("submitted");
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
  );
};

export default Login;
