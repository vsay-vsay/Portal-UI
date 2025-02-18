import React from "react";

interface InputFieldProps {
  type?: string;
  placeholder: string;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({ type = "text", placeholder, value, name, onChange, icon, error }) => {
  return (
    <div className="space-y-2">
      <div className="relative">
        {icon && <span className="absolute left-3 top-3.5 text-gray-500">{icon}</span>}
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full pl-10 pr-4 py-3 rounded-lg border ${error ? "border-red-500" : "border-gray-200"} focus:ring-2 focus:ring-blue-500 transition-all bg-white/20 backdrop-blur-sm`}
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default InputField;
