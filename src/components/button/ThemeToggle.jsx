import React, { useEffect, useState } from "react";

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
    <div>
      <button
        onClick={() => setIsDark(!isDark)}
        className="p-2 rounded-full shadow-md bg-accent dark:bg-gray-800 transition-all duration-300"
      >
        {isDark ? (
          //   <Sun className="w-5 h-5 text-yellow-400" />
          <p>Sun</p>
        ) : (
          //   <Moon className="w-5 h-5 text-white" />
          <p>Moon</p>
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;
