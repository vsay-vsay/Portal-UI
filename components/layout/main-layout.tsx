"use client";

import type React from "react";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { cn } from "@/lib/utils";
import { SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "./app-sidebar";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const defaultOpen = true;
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className="flex h-screen overflow-hidden">
        <AppSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main
            className={cn(
              "flex-1 overflow-y-auto p-4 transition-all duration-300 ease-in-out"
            )}
          >
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
