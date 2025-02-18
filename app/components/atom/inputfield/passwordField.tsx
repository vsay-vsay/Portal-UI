import React, { useState } from "react";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";

interface PasswordFieldProps {
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ value, name, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      <div className="relative">
        <FiLock className="absolute left-3 top-3.5 text-gray-500" />
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder="Secure Password"
          className={`w-full pl-10 pr-12 py-3 rounded-lg border ${error ? "border-red-500" : "border-gray-200"} focus:ring-2 focus:ring-blue-500 transition-all bg-white/20 backdrop-blur-sm`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default PasswordField;
