"use client";

import { Header } from "@/components/layout/SuperAdminHeader";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default Layout;
