import React from "react";
import { z } from "zod";
import CommonForm from "../commonFormBuilder";

// Define role type
type Role = "Admin" | "Accountant" | "Teacher" | "Student" | "Parent" | "Staff";

// Base schema for creation (all fields required)
const createSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  username: z.string().min(2, "Username must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(5, "Password must be at least 5 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
  role: z
    .string({
      required_error: "Role is required",
    })
    .refine(
      (val) => {
        const roles: Role[] = [
          "Admin",
          "Accountant", 
          "Teacher",
          "Student",
          "Parent",
          "Staff",
        ];
        return roles.includes(val as Role);
      },
      {
        message: "Invalid role",
      }
    ),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Update schema (all fields optional except confirmPassword validation)
const updateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  username: z.string().min(2, "Username must be at least 2 characters").optional(),
  email: z.string().email("Invalid email format").optional(),
  password: z.string().min(5, "Password must be at least 5 characters").optional(),
  confirmPassword: z.string().optional(),
  role: z
    .string()
    .refine(
      (val) => {
        if (!val) return true; // Allow empty for optional
        const roles: Role[] = [
          "Admin",
          "Accountant",
          "Teacher", 
          "Student",
          "Parent",
          "Staff",
        ];
        return roles.includes(val as Role);
      },
      {
        message: "Invalid role",
      }
    )
    .optional(),
}).refine((data) => {
  // Only validate password match if password is provided
  if (data.password && data.password.length > 0) {
    return data.password === data.confirmPassword;
  }
  return true;
}, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Infer types
type CreateUserFormData = z.infer<typeof createSchema>;
type UpdateUserFormData = z.infer<typeof updateSchema>;

// Define field option type
interface FieldOption {
  label: string;
  value: string;
}

// Define field types
interface BaseField {
  name: keyof (CreateUserFormData & UpdateUserFormData);
  label: string;
  placeholder?: string;
}

interface TextField extends BaseField {
  type: "text" | "email" | "password";
}

interface SelectField extends BaseField {
  type: "select";
  options: FieldOption[];
}

type FormField = TextField | SelectField;

const fields: FormField[] = [
  {
    name: "name",
    type: "text", 
    label: "Full Name",
    placeholder: "Enter name"
  },
  {
    name: "username",
    type: "text",
    label: "Username", 
    placeholder: "Enter username",
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Enter email"
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    placeholder: "********",
  },
  {
    name: "confirmPassword",
    type: "password", 
    label: "Confirm Password",
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
    ],
  },
];

// Define props interface
interface UpdateCreateFormProps {
  endpoint: string; // API endpoint for create/update
  data?: Partial<UpdateUserFormData> | null;
  onSuccess: () => void;
}

function UpdateCreateForm({
  data = null,
  onSuccess,
  endpoint
}: UpdateCreateFormProps) {
  const isUpdateMode = !!data;
  
  // Transform data before sending to API (remove confirmPassword)
  const transformDataForAPI = (formData: any) => {
    const { confirmPassword, ...apiData } = formData;
    
    // For update mode, only send fields that have values
    if (isUpdateMode) {
      const filteredData: any = {};
      Object.keys(apiData).forEach(key => {
        if (apiData[key] !== undefined && apiData[key] !== '' && apiData[key] !== null) {
          filteredData[key] = apiData[key];
        }
      });
      return filteredData;
    }
    
    return apiData;
  };

  return (
    <CommonForm
      data={data}
      onSuccess={onSuccess}
      schema={isUpdateMode ? updateSchema : createSchema}
      fields={fields}
      api={endpoint}
      mode={isUpdateMode ? "update" : "create"}
      transformData={transformDataForAPI}
    />
  );
}

export default UpdateCreateForm;