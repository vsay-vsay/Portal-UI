import { Field } from "@/types";
import React from "react";
import { z } from "zod";
import CommonForm from "../commonFormBuilder";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(5),
  role: z.string({
    required_error: "Role is required",
  }).refine((val) => {
    const roles = ["Admin", "Accountant", "Teacher", "Student", "Parent", "Staff"];
    return roles.includes(val);
  }, {
    message: "Invalid role",
  }),
});

const fields = [
  { name: "name", type: "text", label: "Full Name", placeholder: "Enter name" },
  { name: "email", type: "email", label: "Email" },
  {
    name: "password",
    type: "password",
    label: "Password",
    placeholder: "********",
  },
  {
    name: "role",
    type: "select",
    label: "Select Role",
    options: [
      { label: "Admin", value: "Admin" },
      { label: "Accountant", value: "Accountant" },
      { label: "Teacher", value: "Teacher" },
      { label: "Student", value: "Student" },
      { label: "Parent", value: "Parent" },
      { label: "Staff", value: "Staff" },
      // { label: "Super Admin", value: "Super Admin" },
    ],
  },
];

function UpdateCreateForm() {
  return <CommonForm schema={schema} fields={fields} api="auth/register" mode="create" />;
}

export default UpdateCreateForm;
