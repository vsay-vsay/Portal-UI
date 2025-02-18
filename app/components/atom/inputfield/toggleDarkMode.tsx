import React from "react";

interface ToggleDarkModeProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ToggleDarkMode: React.FC<ToggleDarkModeProps> = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all"
    >
      {isDarkMode ? "🌞" : "🌙"}
    </button>
  );
};

export default ToggleDarkMode;
