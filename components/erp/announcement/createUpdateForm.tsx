import React from "react";
import { z } from "zod";
import CommonForm from "../commonFormBuilder";

// Base schema for creation
const createSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  visibility: z.enum(["Public", "Private"]),
  poster: z.any().optional(), // File validation is handled separately
});

const updateSchema = createSchema.partial();

// Infer types
type CreateFormData = z.infer<typeof createSchema>;
type UpdateFormData = z.infer<typeof updateSchema>;

// Define field option type
interface FieldOption {
  label: string;
  value: string;
}

// Define field types
interface BaseField {
  name: keyof (CreateFormData & UpdateFormData);
  label: string;
  placeholder?: string;
}

interface TextField extends BaseField {
  type: "text" | "textarea";
}

interface SelectField extends BaseField {
  type: "select";
  options: FieldOption[];
}

interface FileField extends BaseField {
  type: "file";
}

type FormField = TextField | SelectField | FileField;

const fields: FormField[] = [
  {
    name: "title",
    type: "text",
    label: "Title",
    placeholder: "Enter title",
  },
  {
    name: "description",
    type: "textarea",
    label: "Description",
    placeholder: "Enter description",
  },
  {
    name: "visibility",
    type: "select",
    label: "Visibility",
    options: [
      { label: "Public", value: "Public" },
      { label: "Private", value: "Private" },
    ],
  },
  {
    name: "poster",
    type: "file",
    label: "Poster Image",
  },
];

// Define props interface
interface UpdateCreateFormProps {
  endpoint: string;
  data?: Partial<UpdateFormData> | null;
  onSuccess: () => void;
}

function UpdateCreateForm({
  data = null,
  onSuccess,
  endpoint
}: UpdateCreateFormProps) {
  const isUpdateMode = !!data;

  // Convert form values into FormData
  const transformDataForAPI = (formData: any) => {
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        if (key === "poster" && value instanceof File) {
          form.append(key, value);
        } else {
          form.append(key, value as string);
        }
      }
    });
    return form;
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
      isMultipart={true} // Flag for multipart/form-data in CommonForm
    />
  );
}

export default UpdateCreateForm;
