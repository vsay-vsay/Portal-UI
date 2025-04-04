import RoleBasedFeesLayout from "~/components/template/ERP/Fees/role-based-layout";
import type { Route } from "./+types/home";
import  SideNavBar from "~/components/template/sidenavbar"
import StudentAttendance from "~/components/template/ERP/Attendance/ERPAttendance";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "VSAY ERP | Attendance" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const breadcrumbItems = [
  { label: "Attendance" }, // No href means this is the current page
];

export default function ERPPayroll() {
  return (
    <SideNavBar items={breadcrumbItems} enableSidebar="Attendance">
        <StudentAttendance />
    </SideNavBar>
  )
}
