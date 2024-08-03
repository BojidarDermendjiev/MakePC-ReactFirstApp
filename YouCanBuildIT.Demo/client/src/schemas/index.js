import * as yup from "yup";

const userNameRules = /^[a-zA-Z][a-zA-Z0-9_-]{2,15}$/;
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const signUpSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email!")
    .required("Please enter a valid email!"),
  name: yup
    .string()
    .matches(userNameRules, { message: "Please enter your name!" })
    .required("Please enter your name!"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Please create a stronger password!" })
    .required("Please create a stronger password!"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Passwords must match!"),
});

export const signInSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email!")
    .required("Please enter a valid email!"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Please create a stronger password!" })
    .required("Please create a stronger password!"),
});
