import type { Route } from "../+types/home";
import AdminNavigation from "~/components/molecule/sidebar";
import TabsComponent from "~/components/molecule/tab/tabnav";
import UserManagement from "~/components/templete/emp/usermanagement/usermanagement";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "VSAY | User Management" },
    { name: "usermanagement", content: "Welcome To Vsay Portal" },
  ];
}

const Users = () => <div className="p-4"><UserManagement /></div>;

const tabsData = [
    { id: "tab-1", label: "Users", content: <Users /> },
  ];

export default function EmpDashboard() {
  return (
  <>
  <AdminNavigation activeItem='users'>
    <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
    <TabsComponent tabs={tabsData} />
  </AdminNavigation>
  </>
);
}