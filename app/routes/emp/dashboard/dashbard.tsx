// import type { Route } from "../+types/home";
// import AdminNavigation from "~/components/molecule/sidebar";
// import TabsComponent from "~/components/molecule/tab/tabnav";
// import DashboardComponent from "~/components/templete/emp/dashboard/dashboardcomponent";
// import OverviewComponent from "~/components/templete/emp/dashboard/overviewcomponent";

// export function meta({}: Route.MetaArgs) {
//   return [
//     { title: "VSAY | Dashboard" },
//     { name: "dashboard", content: "Welcome To Vsay Portal" },
//   ];
// }

// const Overview = () => <div className="p-4"><OverviewComponent /></div>;
// const Dashboard = () => <div className="p-4"><DashboardComponent /></div>;

// const tabsData = [
//     { id: "tab-1", label: "Overview", content: <Overview /> },
//     { id: "tab-2", label: "Dashboard", content: <Dashboard />},
//   ];

// export default function EmpDashboard() {
//   return (
//   <>
//   <AdminNavigation activeItem='dashboard'>
//     <TabsComponent tabs={tabsData} />
//   </AdminNavigation>
//   </>
// );
// }

import { useState, useEffect } from "react";
import axios from "axios";
import type { Route } from "../+types/home";
import AdminNavigation from "~/components/molecule/sidebar";
import TabsComponent from "~/components/molecule/tab/tabnav";
import DashboardComponent from "~/components/templete/emp/dashboard/dashboardcomponent";
import OverviewComponent from "~/components/templete/emp/dashboard/overviewcomponent";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "VSAY | Dashboard" },
    { name: "dashboard", content: "Welcome To Vsay Portal" },
  ];
}

const Overview = () => <div className="p-4"><OverviewComponent /></div>;
const Dashboard = () => <div className="p-4"><DashboardComponent /></div>;

const tabsData = [
  { id: "tab-1", label: "Overview", content: <Overview /> },
  { id: "tab-2", label: "Dashboard", content: <Dashboard /> },
];

export default function EmpDashboard() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/menu`)
      .then((response) => setMenuItems(response.data))
      .catch((error) => console.error("Error fetching menu items:", error));
  }, []);

  return (
    <AdminNavigation activeItem="dashboard" menuItems={menuItems}>
      <TabsComponent tabs={tabsData} />
    </AdminNavigation>
  );
}
