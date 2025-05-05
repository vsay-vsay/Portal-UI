import { MainLayout } from "@/components/layout/main-layout";
import { FontProvider } from "@/context/font-context";
import { SearchProvider } from "@/context/search-context";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <SearchProvider>
      <FontProvider>
        <MainLayout>{children}</MainLayout>
      </FontProvider>
    </SearchProvider>
  );
}

export default layout;
