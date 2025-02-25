import type { Route } from "../+types/home";
import AdminNavigation from "~/components/molecule/sidebar";
import { useParams, Link } from "react-router";
import { FiMail, FiPhone, FiUser, FiArrowLeft } from "react-icons/fi";

export function meta({}: Route.MetaArgs) {
  return [
    { key: "title", title: "VSAY | User Management" },
    { key: "description", name: "usermanagement", content: "Welcome To Vsay Portal" },
  ];
}

export default function UserDetails() {
  const { userId } = useParams();

  // Dummy user data (Replace with API call if needed)
  const user = {
    id: userId,
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    role: "Admin",
    avatar: "https://i.pravatar.cc/150?img=3", // Placeholder image
  };

  return (
    <AdminNavigation activeItem="users">
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          {/* Back Button */}
          <Link to="/emp/usermanagement" className="flex items-center text-gray-600 hover:text-gray-900 mb-4">
            <FiArrowLeft className="mr-2" /> Back to Users
          </Link>

          {/* User Avatar */}
          <div className="flex flex-col items-center">
            <img src={user.avatar} alt="User Avatar" className="w-24 h-24 rounded-full shadow-md" />
            <h2 className="mt-3 text-xl font-semibold text-gray-800">{user.name}</h2>
            <p className="text-gray-500">{user.role}</p>
          </div>

          {/* User Details */}
          <div className="mt-6 space-y-4">
            <div className="flex items-center space-x-3">
              <FiMail className="text-gray-500" />
              <span className="text-gray-700">{user.email}</span>
            </div>
            <div className="flex items-center space-x-3">
              <FiPhone className="text-gray-500" />
              <span className="text-gray-700">{user.phone}</span>
            </div>
            <div className="flex items-center space-x-3">
              <FiUser className="text-gray-500" />
              <span className="text-gray-700">User ID: {user.id}</span>
            </div>
          </div>
        </div>
      </div>
    </AdminNavigation>
  );
}
