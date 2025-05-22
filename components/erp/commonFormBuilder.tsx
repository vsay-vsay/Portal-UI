import React, { useEffect } from "react";
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
import useRequestHook from "@/hooks/requestHook";
import { LoadingButton } from "../ui/loading-button";
import { useToast } from "@/hooks/use-toast";

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
  schema: T;
  fields: Field[];
  mode: Mode;
  data?: any;
  api: string;
  submitLabel?: string;
};

function CommonForm<T extends ZodTypeAny>({
  schema,
  fields,
  mode,
  data,
  api,
  submitLabel,
}: Props<T>) {
  const method = mode === "update" ? "PUT" : "POST";
  const [request, response, loading, error] = useRequestHook(api, method, null);

  const { toast } = useToast();
  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues: {} as z.infer<T>,
  });

  useEffect(() => {
    if (mode === "update" && data) {
      form.reset(data);
    }
  }, [data, mode, form]);

  const onSubmit = async (values: z.infer<T>) => {
    await request(values);
  };

  useEffect(() => {
    if (response) {
      toast({
        title: response?.message,
        variant: "default",
      });
    }
  }, [response]);

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
                  <FormLabel>{field.label}</FormLabel>
                )}
                <FormControl>
                  {(() => {
                    switch (field.type) {
                      case "text":
                      case "email":
                      case "number":
                      case "password":
                        return (
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
                            <FormLabel>{field.label}</FormLabel>
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
                            defaultValue={controllerField.value}
                          >
                            <SelectTrigger>
                              <SelectValue
                                placeholder={field.label || "Select"}
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

        {error && (
          <p className="text-red-500 text-sm">
            {error.message || "Something went wrong."}
          </p>
        )}
      </form>
    </Form>
  );
}

export default CommonForm;
