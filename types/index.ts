import { ReactNode } from "react";

export type NavLink = {
  title: string;
  url: string;
  icon?: React.ComponentType<any>; // Icon component like `LucideIcon`
  badge?: string;
  external?: boolean;
  disabled?: boolean;
};

export type NavItem = NavLink;

export type NavGroup = {
  title: string;
  items: any[];
};

export type NavCollapsible = {
  title: string;
  url: string; // used for checking active path
  icon?: React.ComponentType<any>;
  badge?: string;
  items: NavItem[];
};

export type Field = {
  name: string;
  label?: string;
  placeholder?: string;
  type:
    | "text"
    | "email"
    | "number"
    | "password"
    | "textarea"
    | "checkbox"
    | "radio"
    | "select";
  options?: { label: string; value: string }[];
};

export interface SelectOption {
  label: string;
  value: string;
}

export interface FormField {
  name: string;
  type:
    | "text"
    | "email"
    | "number"
    | "password"
    | "radio"
    | "textarea"
    | "select"
    | "multiselect"
    | "checkbox"
    | "date"
    | "tags"
    | "object";
  label: string;
  placeholder?: string;
  description?:string;
  options?: SelectOption[];
  fields?: FormField[]; // For nested fields in 'object' type
}

export type FormFieldType = FormField["type"];
