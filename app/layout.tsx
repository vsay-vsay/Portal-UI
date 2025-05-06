import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { MainLayout } from "@/components/layout/main-layout";
import { Toaster } from "@/components/ui/sonner";
import { SearchProvider } from "@/context/search-context";
import { FontProvider } from "@/context/font-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Enterprise ERP System",
  description: "A modern ERP system with multiple themes",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          themes={["light", "dark", "blue", "green", "purple"]}
        >
       
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
