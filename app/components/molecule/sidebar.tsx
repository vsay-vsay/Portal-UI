import React, { useState, useEffect, Children } from "react";
import { FiHome, FiUsers, FiBox, FiFileText, FiSettings, FiLogOut, FiMenu, FiX, FiMoon, FiSun, FiChevronLeft, FiChevronRight, FiMonitor } from "react-icons/fi";
import { BiCaretDown } from "react-icons/bi";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { LoginLogo } from "../../image/index";
import { useNavigate } from "react-router";

const THEMES = {
  light: "light",
  dark: "dark",
  system: "system"
};

const AdminNavigation = ({children, activeItem: initialActiveItem, menuItems =[] }) => {
  const [theme, setTheme] = useState(THEMES.system);
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activeItem, setActiveItem] = useState(initialActiveItem || "dashboard");
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const iconMap = {
    FiHome: FiHome,
    FiUsers: FiUsers,
    FiBox: FiBox,
    FiFileText: FiFileText,
    FiSettings: FiSettings,
    FiLogOut: FiLogOut
  };

  const navigate = useNavigate();

  const isBrowser = typeof window !== "undefined";

  useEffect(() => {
    if (isBrowser) {
      const savedTheme = localStorage.getItem("theme") || THEMES.system;
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (isBrowser) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleThemeChange = () => {
        document.documentElement.classList.toggle("dark", theme === THEMES.dark || (theme === THEMES.system && mediaQuery.matches));
      };

      mediaQuery.addListener(handleThemeChange);
      handleThemeChange();
      return () => mediaQuery.removeListener(handleThemeChange);
    }
  }, [theme]);

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
    if (isBrowser) {
      localStorage.setItem("theme", newTheme);
    }
  };

  return (
    <div className={`min-h-screen dark:bg-gray-900`}>
      <div className="flex transition-colors duration-300">
        <div
          className={`${isOpen ? "w-60" : "w-20"} ${isMobile && !isOpen ? "-translate-x-full" : ""}
            fixed left-0 h-full bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 z-30`}
        >
          <div className="flex items-center justify-between p-4 border-b border-blue-700 dark:border-gray-700">
            <div className="flex items-center">
              <img
                src={LoginLogo}
                alt="Logo"
                className="w-10 h-8 rounded-lg"
              />
              {isOpen && <span className="ml-3 dark:text-white text-black font-bold text-lg">VSAY</span>}
            </div>
            {!isMobile && (
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="absolute -right-3 top-12 p-1.5 rounded-full bg-gray-200 dark:bg-gray-800 dark:text-white text-black shadow-lg hover:bg-blue-200 dark:hover:bg-gray-700 transition-colors"
              >
                {isOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
              </button>
            )}
          </div>
          <nav className="mt-4 p-1">
             {menuItems.length > 0 ? (
              menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveItem(item.id);
                    navigate(item.path);
                  }}
                  // className={`w-full flex items-center px-4 py-3 ${isOpen ? "justify-start" : "justify-center"}
                  // ${activeItem === item.id ? "bg-blue-200 text-blue-700 text-white dark:text-gray-800 rounded-2xl" : "dark:text-gray-100 text-gray-800 hover:bg-indigo-300 hover:text-gray-50 hover:dark:text-gray-800 rounded-2xl"}
                  // transition-all duration-200`}
                  className={`w-full flex items-center px-4 py-3 rounded-lg ${isOpen ? "justify-start" : "justify-center"}
                  ${activeItem === item.id ? "bg-blue-200 text-blue-700" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`}
                >
                  {React.createElement(iconMap[item.icon] || FiHome, { size: 24 })}
                  {isOpen && <span className="ml-4">{item.label}</span>}
                </button>
              ))
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400 mt-4">Loading...</p>
            )}
          </nav>
        </div>

        <div className={`flex-1 ${isOpen ? "ml-64" : "ml-20"} transition-all duration-300`}>
          <header className="fixed top-0 right-0 z-20 flex items-center justify-between h-16 px-4 bg-white dark:bg-gray-800 shadow-md"
            style={{ width: `calc(100% - ${isOpen ? "15rem" : "5rem"})` }}
          >
            {isMobile && (
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            )}

            <div className="flex items-center ml-auto space-x-4">
                <button className="px-2 py-1 flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <MdOutlineNotificationsNone size={28} />
                </button>
              {/* Theme Toggle */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsThemeDropdownOpen(!isThemeDropdownOpen);
                    setIsUserDropdownOpen(false);
                  }}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center"
                >
                  {theme === THEMES.light && <FiSun size={24} />}
                  {theme === THEMES.dark && <FiMoon size={24} />}
                  {theme === THEMES.system && <FiMonitor size={24} />}
                </button>
                {isThemeDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2">
                    <button onClick={() => toggleTheme(THEMES.light)} className="w-full px-4 py-2 flex items-center hover:bg-gray-100 dark:hover:bg-gray-700"><FiSun className="mr-2" /> Light Mode</button>
                    <button onClick={() => toggleTheme(THEMES.dark)} className="w-full px-4 py-2 flex items-center hover:bg-gray-100 dark:hover:bg-gray-700"><FiMoon className="mr-2" /> Dark Mode</button>
                    <button onClick={() => toggleTheme(THEMES.system)} className="w-full px-4 py-2 flex items-center hover:bg-gray-100 dark:hover:bg-gray-700"><FiMonitor className="mr-2" /> System</button>
                  </div>
                )}
              </div>

              {/* User Profile */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsUserDropdownOpen(!isUserDropdownOpen);
                    setIsThemeDropdownOpen(false);
                  }}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e" alt="Profile" className="w-8 h-8 rounded-full" />
                  <span className="dark:text-white">John Doe</span>
                  <BiCaretDown size={20} />
                </button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2">
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Profile</button>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Settings</button>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Sign Out</button>
                  </div>
                )}
              </div>
            </div>
          </header>
        </div>
      </div>
      <div className={`flex-1 ${isOpen ? "ml-65" : "ml-25"} mt-18 transition-all duration-300`}> 
          {children}
      </div>
    </div>
  );
};

export default AdminNavigation;
