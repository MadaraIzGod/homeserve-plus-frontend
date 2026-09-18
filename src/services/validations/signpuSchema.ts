import * as yup from "yup";
export const SignupSchema = yup.object({
  name: yup
    .string()
    .min(6, "min 6 character is required")
    .max(20, "Max 20 charcter is allowed")
    .required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone no is required"),
  password: yup
    .string()
    .min(6, "min length 6")
    .required("Password is required"),
});
