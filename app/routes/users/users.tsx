import React, { useState, useContext, createContext, lazy, Suspense } from "react";
import { FiPackage, FiUsers, FiTruck, FiPieChart, FiLayout, FiLogOut } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RoleContext = createContext();

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
  </div>
);

const AdminDashboard = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white p-6 rounded-xl shadow-md"
      >
        <h3 className="text-lg font-semibold mb-4">Total Inventory</h3>
        <p className="text-3xl font-bold text-blue-700">1,234</p>
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white p-6 rounded-xl shadow-md"
      >
        <h3 className="text-lg font-semibold mb-4">Active Users</h3>
        <p className="text-3xl font-bold text-emerald-600">567</p>
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white p-6 rounded-xl shadow-md"
      >
        <h3 className="text-lg font-semibold mb-4">Pending Orders</h3>
        <p className="text-3xl font-bold text-orange-500">89</p>
      </motion.div>
    </div>
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-4">Stock Analytics</h3>
      <div className="h-64">
        <Line
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
              {
                label: "Stock Level",
                data: [65, 59, 80, 81, 56, 55],
                borderColor: "#1E40AF",
                tension: 0.4
              }
            ]
          }}
          options={{ responsive: true, maintainAspectRatio: false }}
        />
      </div>
    </div>
  </div>
);

const UserDashboard = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white p-6 rounded-xl shadow-md"
      >
        <h3 className="text-lg font-semibold mb-4">My Requests</h3>
        <p className="text-3xl font-bold text-blue-700">12</p>
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white p-6 rounded-xl shadow-md"
      >
        <h3 className="text-lg font-semibold mb-4">Items In Use</h3>
        <p className="text-3xl font-bold text-emerald-600">8</p>
      </motion.div>
    </div>
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-4">Usage History</h3>
      <div className="h-64">
        <Bar
          data={{
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
            datasets: [
              {
                label: "Items Used",
                data: [4, 6, 8, 5, 7],
                backgroundColor: "#10B981"
              }
            ]
          }}
          options={{ responsive: true, maintainAspectRatio: false }}
        />
      </div>
    </div>
  </div>
);

const VendorDashboard = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white p-6 rounded-xl shadow-md"
      >
        <h3 className="text-lg font-semibold mb-4">Active Orders</h3>
        <p className="text-3xl font-bold text-blue-700">23</p>
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white p-6 rounded-xl shadow-md"
      >
        <h3 className="text-lg font-semibold mb-4">Delivered Items</h3>
        <p className="text-3xl font-bold text-emerald-600">145</p>
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white p-6 rounded-xl shadow-md"
      >
        <h3 className="text-lg font-semibold mb-4">Performance Score</h3>
        <p className="text-3xl font-bold text-orange-500">92%</p>
      </motion.div>
    </div>
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-4">Delivery Performance</h3>
      <div className="h-64">
        <Line
          data={{
            labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
            datasets: [
              {
                label: "On-time Delivery Rate",
                data: [95, 89, 92, 94],
                borderColor: "#F97316",
                tension: 0.4
              }
            ]
          }}
          options={{ responsive: true, maintainAspectRatio: false }}
        />
      </div>
    </div>
  </div>
);

const Sidebar = ({ role, setRole }) => {
  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className="w-64 bg-white shadow-lg h-screen p-4 fixed left-0 top-0"
    >
      <div className="flex flex-col h-full">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-700">IMS Dashboard</h2>
        </div>
        <nav className="flex-grow">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setRole("admin")}
                className={`w-full flex items-center p-3 rounded-lg ${role === "admin" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"}`}
              >
                <FiPieChart className="mr-3" /> Admin View
              </button>
            </li>
            <li>
              <button
                onClick={() => setRole("user")}
                className={`w-full flex items-center p-3 rounded-lg ${role === "user" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"}`}
              >
                <FiUsers className="mr-3" /> User View
              </button>
            </li>
            <li>
              <button
                onClick={() => setRole("vendor")}
                className={`w-full flex items-center p-3 rounded-lg ${role === "vendor" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"}`}
              >
                <FiTruck className="mr-3" /> Vendor View
              </button>
            </li>
          </ul>
        </nav>
        <button className="flex items-center p-3 text-red-600 hover:bg-red-50 rounded-lg">
          <FiLogOut className="mr-3" /> Logout
        </button>
      </div>
    </motion.div>
  );
};

const DashboardContainer = ({ role }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="ml-64 p-8 bg-gray-50 min-h-screen"
    >
      <Suspense fallback={<LoadingFallback />}>
        {role === "admin" && <AdminDashboard />}
        {role === "user" && <UserDashboard />}
        {role === "vendor" && <VendorDashboard />}
      </Suspense>
    </motion.div>
  );
};

const App = () => {
  const [role, setRole] = useState("admin");

  return (
    <RoleContext.Provider value={{ role }}>
      <div className="flex">
        <Sidebar role={role} setRole={setRole} />
        <DashboardContainer role={role} />
      </div>
    </RoleContext.Provider>
  );
};

export default App;