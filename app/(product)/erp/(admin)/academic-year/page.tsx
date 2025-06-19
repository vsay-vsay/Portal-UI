import AcademicYearPage from "@/components/erp/admin/academicYears";
import React from "react";

import { generatePageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata({
  title: "ERP System - Academic Year Management",
  description:
    "Manage academic years, including creation, updates, and archiving of academic terms.",
  keywords: [
    "academic year",
    "academic term",
    "school management",
    "education system",
  ],
  baseTitle: "",
});

function Page() {
  return <AcademicYearPage />;
}

export default Page;
