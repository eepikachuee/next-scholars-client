import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="relative w-14 h-8 flex items-center px-1 bg-gray-300 dark:bg-gray-700 rounded-full transition-colors duration-300 focus:outline-none"
    >
      <div
        className={`absolute left-1 top-1 w-6 h-6 flex items-center justify-center rounded-full bg-white shadow-md transform transition-transform duration-300 ${
          isDark ? "translate-x-6" : ""
        }`}
      >
        {isDark ? (
          <Moon className="w-4 h-4 text-gray-800" />
        ) : (
          <Sun className="w-4 h-4 text-yellow-500" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
