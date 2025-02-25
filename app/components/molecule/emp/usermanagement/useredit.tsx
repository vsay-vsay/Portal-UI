import { FiX } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

const UserEditDrawer = ({ isEdit, setIsEdit }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    username: "",
    password: "",
    role: "",
  });
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case "Full Name":
        return value.length < 2 ? "Name must be at least 2 characters" : "";
      case "Phone":
        return !/^\d{10}$/.test(value) ? "Phone must be 10 digits" : "";
      case "Username":
        return value.length < 3 ? "Username must be at least 3 characters" : "";
      case "Password":
        return !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/.test(value)
          ? "Password must be 8+ chars with uppercase, lowercase & number"
          : "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("User Updated successfully!");
      setIsEdit(false);
      setFormData({
        fullName: "",
        phone: "",
        username: "",
        password: "",
        role: "",
      });
    } catch (error) {
      toast.error("Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isEdit && <div className="fixed inset-0 backdrop-blur-xs z-40" onClick={() => setIsEdit(false)} />}

      <div
        className={`fixed right-0 top-0 h-full w-full md:w-[30%] bg-white shadow-2xl transition-transform duration-300 transform z-50 ${
            isEdit ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex p-3 pl-5 justify-between items-center  bg-gray-100">
            <h2 className="text-2xl font-bold text-gray-800">Update User Details</h2>
            <button onClick={() => setIsEdit(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <FiX className="text-2xl" />
            </button>
          </div>
        <div className="p-6 h-full overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {["Full Name", "Phone", "Username", "Password","Role" ].map((field) => (
              <div key={field}>
                <label className="block text-md font-medium text-gray-700">{field}</label>
                <input
                  type={field.toLowerCase() === "password" ? "password" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className={`mt-1 block h-10 w-full rounded-md border-gray-300 p-3 border shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    errors[field] ? "border-red-500" : ""
                  }`}
                  placeholder={`Enter ${field}`}
                  required={field === "Role" || field === "Password" || field === "Username" ? true : false}
                />
                {errors[field] && <p className="mt-1 text-sm text-red-600">{errors[field]}</p>}
              </div>
            ))}

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
              >
                {loading ? "Updating..." : "Update"}
              </button>
              <button
                type="button"
                onClick={() => setIsEdit(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer position="top-right" />
    </>
  );
};

export default UserEditDrawer;
