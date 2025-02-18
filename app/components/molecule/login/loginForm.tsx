import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from "../../atom/inputfield/inputfield";
import PasswordField from "../../atom/inputfield/passwordField";
import { FiMail, FiUser } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router";

const LoginForm: React.FC = () => {
const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      company: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      company: Yup.string().min(2, "Company name should be at least 2 characters").required("Company name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().min(6, "Password should be at least 6 characters").required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, values);
        console.log("Login successful", response.data);
        navigate(`${response.data.data}`);
      } catch (error) {
        console.error("Login failed", error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <InputField
        name="company"
        placeholder="Enter Company Name"
        value={formik.values.company}
        onChange={formik.handleChange}
        error={formik.errors.company}
        icon={<FiUser />}
      />

      <InputField
        name="email"
        placeholder="Corporate Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.errors.email}
        icon={<FiMail />}
      />

      <PasswordField
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.errors.password}
      />

      <button
        type="submit"
        className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:opacity-90 transition-all"
      >
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
