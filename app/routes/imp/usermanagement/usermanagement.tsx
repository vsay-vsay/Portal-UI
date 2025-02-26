import axios from "axios";
import type { Route } from "../+types/home";
import AdminNavigation from "~/components/molecule/sidebar";
import TabsComponent from "~/components/molecule/tab/tabnav";
import UserManagement from "~/components/templete/imp/usermanagement/usermanagement";
import { useEffect, useState } from "react";

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
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/menu`)
        .then((response) => setMenuItems(response.data))
        .catch((error) => console.error("Error fetching menu items:", error));
    }, []);
  return (
  <>
  <AdminNavigation activeItem='users' menuItems={menuItems}>
    <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
    <TabsComponent tabs={tabsData} />
  </AdminNavigation>
  </>
);
}