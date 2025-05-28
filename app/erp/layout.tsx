
import { MainLayout } from "@/components/layout/main-layout";
import { FontProvider } from "@/context/font-context";
import { SearchProvider } from "@/context/search-context";
import React from "react";
import { NuqsAdapter } from "nuqs/adapters/next/app";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <NuqsAdapter>
    <SearchProvider>
      <FontProvider>
        <MainLayout>{children}</MainLayout>
      </FontProvider>
    </SearchProvider>
    </NuqsAdapter>
  );
}

export default layout;
