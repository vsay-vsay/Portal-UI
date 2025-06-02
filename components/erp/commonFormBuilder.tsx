"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodTypeAny } from "zod";
import {
  Form,
  FormControl,
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
import { Eye, EyeOff } from "lucide-react";
import useRequestHook from "@/hooks/requestHook";
import { LoadingButton } from "../ui/loading-button";
import { toast } from "sonner";

type Mode = "create" | "update";

type Field =
  | {
      name: string;
      label?: string;
      placeholder?: string;
      type: "text" | "email" | "number" | "password";
    }
  | {
      name: string;
      label?: string;
      placeholder?: string;
      type: "textarea";
    }
  | {
      name: string;
      label?: string;
      type: "checkbox";
    }
  | {
      name: string;
      label?: string;
      type: "radio";
      options: { label: string; value: string }[];
    }
  | {
      name: string;
      label?: string;
      type: "select";
      placeholder?: string;
      options: { label: string; value: string }[];
    };

type Props<T extends ZodTypeAny> = {
  onSuccess?: () => void;
  schema: T;
  fields: Field[];
  mode: Mode;
  data?: any;
  api: string;
  submitLabel?: string;
  transformData?: (data: z.infer<T>) => any; // New prop for data transformation
};

function CommonForm<T extends ZodTypeAny>({
  onSuccess,
  schema,
  fields,
  mode,
  data,
  api,
  submitLabel,
  transformData, // New prop
}: Props<T>) {
  const method = mode === "update" ? "PUT" : "POST";
  const [request, response, loading, error, reset] = useRequestHook(
    api,
    method,
    null
  );

  // State to track password visibility for each password field
  const [passwordVisibility, setPasswordVisibility] = useState<Record<string, boolean>>({});

  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues: data || {},
  });

  const togglePasswordVisibility = (fieldName: string) => {
    setPasswordVisibility(prev => ({
      ...prev,
      [fieldName]: !prev[fieldName]
    }));
  };

  useEffect(() => {
    if (mode === "update" && data) {
      form.reset(data);
    }
  }, [data, mode, form]);

  const onSubmit = async (values: z.infer<T>) => {
    // Transform data if transformData function is provided
    const dataToSend = transformData ? transformData(values) : values;
    await request(dataToSend);
  };

  useEffect(() => {
    if (response) {
      toast.success(response?.message || `Successfully ${mode === 'create' ? 'created' : 'updated'}!`, {
        position: "bottom-right"
      });
      reset(); // Reset the request state after successful submission
      form.reset(); // Reset the form after successful submission
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
                    {/* Show optional indicator for update mode */}
                    {mode === "update" && (
                      <span className="text-gray-500 text-sm ml-1">(optional)</span>
                    )}
                  </FormLabel>
                )}
                <FormControl>
                  {(() => {
                    switch (field.type) {
                      case "text":
                      case "email":
                      case "number":
                      case "password":
                        return (
                          
                          field.type==="password"? <div className="relative">
                            <Input
                              {...controllerField}
                              // disabled={field.type === "password" && mode === "update"}
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
                          </div>:
                          <Input
                            {...controllerField}
                            placeholder={field.placeholder}
                            type={field.type}
                          
                          />
                        );
                      case "textarea":
                        return (
                          <Textarea
                            {...controllerField}
                            placeholder={field.placeholder}
                          />
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
                              <label
                                key={option.value}
                                className="flex items-center gap-1"
                              >
                                <input
                                  type="radio"
                                  value={option.value}
                                  checked={
                                    controllerField.value === option.value
                                  }
                                  onChange={() =>
                                    controllerField.onChange(option.value)
                                  }
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
                                placeholder={
                                  field.placeholder || 
                                  field.label || 
                                  "Select"
                                }
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
                      default:
                        return null;
                    }
                  })()}
                </FormControl>
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