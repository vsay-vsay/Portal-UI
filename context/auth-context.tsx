"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  email: string;
  name: string;
  role: string;
  domainName: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  domainName1: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [domainName1, setDomainName] = useState<string>("");
  const router = useRouter();
  const [count, setCount] = useState(0);
  const redirectUser = (role: string) => {
    switch (role) {
      case "Admin":
        router.replace("/erp/admin-dashboard");
        break;
      case "Teacher":
        router.replace("/erp/teacher-dashboard");
        break;
      case "Student":
        router.replace("/erp/student-dashboard");
        break;
      case "Accountant":
        router.replace("/erp/accountant-dashboard");
        break;
      default:
        router.replace("/erp/admin-dashboard");
        break;
    }
  };

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("token", userData.token);
    localStorage.setItem("email", userData.email);
    localStorage.setItem("name", userData.name);
    localStorage.setItem("role", userData.role);
    redirectUser(userData.role); // Redirect on login
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    setUser(null);
    router.replace("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const name = localStorage.getItem("name");
    const role = localStorage.getItem("role");
    const domainName = localStorage.getItem("domainName");
    const selectedDomain = localStorage.getItem("selectedDomain");

    if (token && email && name && role && domainName) {
      const userObj = { email, name, role, domainName, token };
      setUser(userObj);
      if (count === 0) {
        redirectUser(role);
        setCount(count + 1);
      }
    } else {
      if (selectedDomain) {
        setDomainName(selectedDomain);
        router.replace("/"); // Login page
      } else {
        router.replace("/select-org"); // Org selection
      }
    }
  }, []);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, domainName1 }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
