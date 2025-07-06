import React from "react";
import { z } from "zod";
import CommonForm from "../commonFormBuilder";
import { FormField } from "@/types";

// Define role type
type Role = "Admin" | "Accountant" | "Teacher" | "Student" | "Parent" | "Staff";

// Base schema for creation (all fields required)
const baseAnnouncementFields = {
  title: z.string().min(2, "Title is required"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  priority: z.enum(["low", "medium", "high"]),
  category: z.string().min(1, "Category is required"),
  targetAudience: z.array(z.enum(["Student", "Parent", "Teacher"])),
  productVisibility: z.array(z.enum(["erp", "lms"])),
  isPinned: z.boolean(),
  expiryDate: z.string().optional(), // Optional ISO date string
  tags: z.array(z.string()).optional(),
//   metadata: z.object({
//     department: z.string(),
//     subject: z.string(),
//     grade: z.string(),
//     section: z.string(),
//   }),
};

// Create schema (all fields required except optional ones)
const createSchema = z.object({
  ...baseAnnouncementFields,
  expiryDate: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

// Update schema (all fields optional)
const updateSchema = z.object({
  title: z.string().min(2, "Title is required").optional(),
  content: z.string().min(10, "Content must be at least 10 characters").optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
  category: z.string().min(1, "Category is required").optional(),
  targetAudience: z.array(z.enum(["Student", "Parent", "Teacher"])).optional(),
  productVisibility: z.array(z.enum(["erp", "lms"])).optional(),
  isPinned: z.boolean().default(false),
  expiryDate: z.string().optional(),
  tags: z.array(z.string()).optional(),
//   metadata: z.object({
//     department: z.string(),
//     subject: z.string(),
//     grade: z.string(),
//     section: z.string(),
//   }).optional(),
});

// Infer types
type CreateAnnouncementFormData = z.infer<typeof createSchema>;
type UpdateAnnouncementFormData = z.infer<typeof updateSchema>;


const fields: FormField[] = [
  {
    name: "title",
    type: "text",
    label: "Announcement Title",
    placeholder: "Enter announcement title"
  },
  {
    name: "content",
    type: "textarea",
    label: "Content",
    placeholder: "Enter announcement content"
  },
  {
    name: "priority",
    type: "select",
    label: "Priority",
    options: [
      { label: "Low", value: "low" },
      { label: "Medium", value: "medium" },
      { label: "High", value: "high" },
    ],
  },
  {
    name: "category",
    type: "select",
    label: "Category",
    options: [
      { label: "General", value: "general" },
      { label: "Academic", value: "academic" },
      { label: "Sports", value: "sports" },
      { label: "Events", value: "events" },
      { label: "Holidays", value: "holidays" },
      { label: "Emergency", value: "emergency" },
    ],
  },
  {
    name: "targetAudience",
    type: "multiselect",
    label: "Target Audience",
    options: [
      { label: "Student", value: "Student" },
      { label: "Parent", value: "Parent" },
      { label: "Teacher", value: "Teacher" },
    ],
  },
  {
    name: "productVisibility",
    type: "multiselect",
    label: "Product Visibility",
    options: [
      { label: "ERP", value: "erp" },
      { label: "LMS", value: "lms" },
    ],
  },
  {
    name: "isPinned",
    type: "checkbox",
    label: "Pin this announcement",
  },
  {
    name: "expiryDate",
    type: "date",
    label: "Expiry Date (Optional)",
    placeholder: "Select expiry date"
  },
  {
    name: "tags",
    type: "tags",
    label: "Tags (Optional)",
    placeholder: "Add tags"
  },
//   {
//     name: "metadata",
//     type: "object",
//     label: "Metadata",
//     fields: [
//       {
//         name: "department",
//         type: "text",
//         label: "Department",
//         placeholder: "Enter department"
//       },
//       {
//         name: "subject",
//         type: "text",
//         label: "Subject",
//         placeholder: "Enter subject"
//       },
//       {
//         name: "grade",
//         type: "text",
//         label: "Grade",
//         placeholder: "Enter grade"
//       },
//       {
//         name: "section",
//         type: "text",
//         label: "Section",
//         placeholder: "Enter section"
//       },
//     ]
//   },
];

// Define props interface
interface UpdateCreateAnnouncementFormProps {
  endpoint: string; // API endpoint for create/update
  data?: Partial<UpdateAnnouncementFormData> | null;
  onSuccess: () => void;
}

function UpdateCreateAnnouncementForm({
  data = null,
  onSuccess,
  endpoint
}: UpdateCreateAnnouncementFormProps) {
  const isUpdateMode = !!data;
  
  // Transform data before sending to API
  const transformDataForAPI = (formData: any) => {
    // For update mode, only send fields that have values
    if (isUpdateMode) {
      const filteredData: any = {};
      Object.keys(formData).forEach(key => {
        if (formData[key] !== undefined && formData[key] !== '' && formData[key] !== null) {
          // Special handling for arrays and objects
          if (Array.isArray(formData[key])) {
            if (formData[key].length > 0) {
              filteredData[key] = formData[key];
            }
          } else if (typeof formData[key] === 'object' && formData[key] !== null) {
            // For object fields like metadata, check if any nested field has value
            const hasValue = Object.values(formData[key]).some(val => val !== undefined && val !== '' && val !== null);
            if (hasValue) {
              filteredData[key] = formData[key];
            }
          } else {
            filteredData[key] = formData[key];
          }
        }
      });
      return filteredData;
    }
    
    // For create mode, ensure required fields are present
    const processedData = { ...formData };
    
    // Set default values for optional fields if not provided
    if (!processedData.tags) {
      processedData.tags = [];
    }
    
    // Ensure metadata has all required fields
    if (!processedData.metadata) {
      processedData.metadata = {
        department: "",
        subject: "",
        grade: "",
        section: "",
      };
    }
    
    return processedData;
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

export default UpdateCreateAnnouncementForm;