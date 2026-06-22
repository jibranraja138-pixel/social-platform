import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Invalid Email")
    .required("Email Required"),

  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password Required")
});

export const registerSchema = yup.object({
  username: yup
    .string()
    .required("Username Required"),

  email: yup
    .string()
    .email("Invalid Email")
    .required("Email Required"),

  password: yup
    .string()
    .min(6)
    .required("Password Required")
});