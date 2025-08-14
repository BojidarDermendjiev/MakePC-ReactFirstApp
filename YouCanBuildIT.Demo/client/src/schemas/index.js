import * as Yup from "yup";

export const loginSchema = Yup.object({
  Email: Yup.string().email("Invalid email").required("Email required"),
  Password: Yup.string().required("Password required"),
});

export const signInSchema = loginSchema;

export const registerSchema = Yup.object({
  Email: Yup.string().email("Invalid email").required("Email required"),
  Password: Yup.string()
    .min(6, "Password too short")
    .required("Password required"),
  ConfirmPassword: Yup.string()
    .oneOf([Yup.ref("Password"), null], "Passwords must match")
    .required("Confirm Password required"),
  FullName: Yup.string()
    .min(2, "Full name too short")
    .required("Full Name required"),
});

export const signUpSchema = registerSchema;

export const forgotPasswordSchema = Yup.object({
  Email: Yup.string().email("Invalid email").required("Email required"),
});
export const resetPasswordSchema = Yup.object({
  Password: Yup.string()
    .min(6, "Password too short")
    .required("Password required"),
  ConfirmPassword: Yup.string()
    .oneOf([Yup.ref("Password"), null], "Passwords must match")
    .required("Confirm Password required"),
});
export const changePasswordSchema = Yup.object({
  CurrentPassword: Yup.string().required("Current Password required"),
  NewPassword: Yup.string()
    .min(6, "New Password too short")
    .required("New Password required"),
  ConfirmNewPassword: Yup.string()
    .oneOf([Yup.ref("NewPassword"), null], "Passwords must match")
    .required("Confirm New Password required"),
});
