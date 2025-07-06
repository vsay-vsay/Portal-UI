"use client";
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodTypeAny } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, EyeOff, Plus, X, Calendar } from "lucide-react";
import useRequestHook from "@/hooks/requestHook";
import { LoadingButton } from "../ui/loading-button";
import { toast } from "sonner";

type Mode = "create" | "update";

type BaseField = {
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
};

type SimpleField = BaseField & {
  type: "text" | "email" | "number" | "password";
};

type TextareaField = BaseField & {
  type: "textarea";
};

type CheckboxField = BaseField & {
  type: "checkbox";
};

type RadioField = BaseField & {
  type: "radio";
  options: { label: string; value: string }[];
};

type SelectField = BaseField & {
  type: "select";
  options: { label: string; value: string }[];
};

type MultiselectField = BaseField & {
  type: "multiselect";
  options: { label: string; value: string }[];
};

type DateField = BaseField & {
  type: "date";
};

type TagsField = BaseField & {
  type: "tags";
};

type ObjectField = BaseField & {
  type: "object";
  fields: Field[];
};

type Field =
  | SimpleField
  | TextareaField
  | CheckboxField
  | RadioField
  | SelectField
  | MultiselectField
  | DateField
  | TagsField
  | ObjectField;

type Props<T extends ZodTypeAny> = {
  onSuccess?: () => void;
  schema: T;
  fields: Field[];
  mode: Mode;
  data?: any;
  api: string;
  submitLabel?: string;
  transformData?: (data: z.infer<T>) => any;
};

// Multi-select component
const MultiSelectField = ({
  field,
  options,
  value,
  onChange,
}: {
  field: MultiselectField;
  options: { label: string; value: string }[];
  value: string[];
  onChange: (value: string[]) => void;
}) => {
  const toggleOption = (optionValue: string) => {
    const currentValues = value || [];
    if (currentValues.includes(optionValue)) {
      onChange(currentValues.filter((v) => v !== optionValue));
    } else {
      onChange([...currentValues, optionValue]);
    }
  };

  return (
    <div className="space-y-2">
      {options.map((option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <Checkbox
            checked={value?.includes(option.value) || false}
            onCheckedChange={() => toggleOption(option.value)}
          />
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

// Tags component
const TagsField = ({
  value,
  onChange,
  placeholder,
}: {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}) => {
  const [inputValue, setInputValue] = useState("");

  const addTag = () => {
    if (inputValue.trim() && !value?.includes(inputValue.trim())) {
      onChange([...(value || []), inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value?.filter((tag) => tag !== tagToRemove) || []);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {value?.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="hover:text-blue-600"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            placeholder || "Type and press Enter or comma to add tags"
          }
          className="flex-1"
        />
        <Button type="button" variant="outline" onClick={addTag}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

// Object field component
const ObjectField = ({
  field,
  value,
  onChange,
  mode,
}: {
  field: ObjectField;
  value: any;
  onChange: (value: any) => void;
  mode: Mode;
}) => {
  const updateObjectField = (fieldName: string, fieldValue: any) => {
    onChange({
      ...value,
      [fieldName]: fieldValue,
    });
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
      {field.fields.map((subField) => (
        <div key={subField.name} className="space-y-2">
          <label className="text-sm font-medium">
            {subField.label}
            {mode === "update" && (
              <span className="text-gray-500 text-sm ml-1">(optional)</span>
            )}
          </label>
          <Input
            value={value?.[subField.name] || ""}
            onChange={(e) => updateObjectField(subField.name, e.target.value)}
            placeholder={subField.placeholder}
            type={subField.type === "number" ? "number" : "text"}
          />
        </div>
      ))}
    </div>
  );
};

function CommonForm<T extends ZodTypeAny>({
  onSuccess,
  schema,
  fields,
  mode,
  data,
  api,
  submitLabel,
  transformData,
}: Props<T>) {
  const method = mode === "update" ? "PUT" : "POST";
  const [request, response, loading, error, reset] = useRequestHook(
    api,
    method,
    null
  );

  const [passwordVisibility, setPasswordVisibility] = useState<
    Record<string, boolean>
  >({});

  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues: data || {},
  });

  const togglePasswordVisibility = (fieldName: string) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  useEffect(() => {
    if (mode === "update" && data) {
      form.reset(data);
    }
  }, [data, mode, form]);

  const onSubmit = async (values: z.infer<T>) => {
    const dataToSend = transformData ? transformData(values) : values;
    await request(dataToSend);
  };

  useEffect(() => {
    if (response) {
      toast.success(
        response?.message ||
          `Successfully ${mode === "create" ? "created" : "updated"}!`,
        {
          position: "bottom-right",
        }
      );
      reset();
      form.reset();
      if (onSuccess) {
        onSuccess();
      }
    }

    if (error) {
      toast.error(error, {
        position: "bottom-right",
      });
    }
  }, [response, error, mode, onSuccess, reset, form]);

  const renderField = (field: Field, controllerField: any) => {
    switch (field.type) {
      case "text":
      case "email":
      case "number":
        return (
          <Input
            {...controllerField}
            placeholder={field.placeholder}
            type={field.type}
          />
        );

      case "password":
        return (
          <div className="relative">
            <Input
              {...controllerField}
              placeholder={
                mode === "update" && field.type === "password"
                  ? "Leave blank to keep current password"
                  : field.placeholder
              }
              type={passwordVisibility[field.name] ? "text" : "password"}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => togglePasswordVisibility(field.name)}
            >
              {passwordVisibility[field.name] ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        );

      case "textarea":
        return (
          <Textarea {...controllerField} placeholder={field.placeholder} />
        );

      case "checkbox":
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={controllerField.value}
              onCheckedChange={controllerField.onChange}
            />
            <FormLabel>
              {field.label}
              {mode === "update" && (
                <span className="text-gray-500 text-sm ml-1">(optional)</span>
              )}
            </FormLabel>
          </div>
        );

      case "radio":
        return (
          <div className="flex gap-4">
            {field.options.map((option) => (
              <label key={option.value} className="flex items-center gap-1">
                <input
                  type="radio"
                  value={option.value}
                  checked={controllerField.value === option.value}
                  onChange={() => controllerField.onChange(option.value)}
                />
                {option.label}
              </label>
            ))}
          </div>
        );

      case "select":
        return (
          <Select
            onValueChange={controllerField.onChange}
            value={controllerField.value || ""}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={field.placeholder || field.label || "Select"}
              />
            </SelectTrigger>
            <SelectContent>
              {field.options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "multiselect":
        return (
          <MultiSelectField
            field={field}
            options={field.options}
            value={controllerField.value || []}
            onChange={controllerField.onChange}
          />
        );

      case "date":
        return (
          <div className="relative">
            <Input
              {...controllerField}
              type="date"
              placeholder={field.placeholder}
            />
            <Calendar className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        );

      case "tags":
        return (
          <TagsField
            value={controllerField.value || []}
            onChange={controllerField.onChange}
            placeholder={field.placeholder}
          />
        );

      case "object":
        return (
          <ObjectField
            field={field}
            value={controllerField.value || {}}
            onChange={controllerField.onChange}
            mode={mode}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {fields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name as keyof z.infer<T>}
            render={({ field: controllerField }) => (
              <FormItem>
                {field.type !== "checkbox" && (
                  <FormLabel>
                    {field.label}
                    {mode === "update" && (
                      <span className="text-gray-500 text-sm ml-1">
                        (optional)
                      </span>
                    )}
                  </FormLabel>
                )}
                <FormControl>{renderField(field, controllerField)}</FormControl>

                {field.description && (
                  <FormDescription className="mt-2">
                    {field.description}
                  </FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <LoadingButton loading={loading} type="submit" disabled={loading}>
          {submitLabel || (mode === "create" ? "Create" : "Update")}
        </LoadingButton>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </Form>
  );
}

export default CommonForm;
