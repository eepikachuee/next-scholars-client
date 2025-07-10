import { NavLink } from "react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "../button/ThemeToggle";

const Navbar = ({ isLoggedIn, userRole }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItemClasses = ({ isActive }) =>
    `block transition px-3 py-2 rounded-md text-base font-medium ${
      isActive ? "text-primary font-semibold" : "text-muted-foreground"
    }`;

  return (
    <header className="w-full px-4 py-3 shadow-md dark:bg-gray-900 bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-bold text-primary">
          🎓 NextScholars
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-4 ml-auto">
          <NavLink to="/" className={navItemClasses}>
            Home
          </NavLink>
          <NavLink to="/scholarships" className={navItemClasses}>
            All Scholarships
          </NavLink>
          {isLoggedIn && userRole === "user" && (
            <NavLink to="/dashboard/user" className={navItemClasses}>
              User Dashboard
            </NavLink>
          )}
          {isLoggedIn && userRole === "admin" && (
            <NavLink to="/dashboard/admin" className={navItemClasses}>
              Admin Dashboard
            </NavLink>
          )}
          {!isLoggedIn ? (
            <NavLink to="/login" className={navItemClasses}>
              Login
            </NavLink>
          ) : (
            <button
              onClick={() => console.log("Logout")}
              className="text-sm px-3 py-2 rounded-md bg-destructive text-white hover:bg-destructive/90"
            >
              Logout
            </button>
          )}
          {!isLoggedIn && (
            <NavLink to="/registration" className={navItemClasses}>
              Registration
            </NavLink>
          )}
          <ThemeToggle />
        </nav>

        {/* Hamburger */}
        <button
          className="md:hidden p-2 ml-auto"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      {menuOpen && (
        <>
          {/* Background Overlay */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setMenuOpen(false)}
          />

          {/* Drawer Menu */}
          <div className="fixed top-0 right-0 w-64 h-full bg-white dark:bg-gray-900 z-50 p-6 space-y-4 shadow-lg transition-all">
            <NavLink
              to="/"
              className={navItemClasses}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/scholarships"
              className={navItemClasses}
              onClick={() => setMenuOpen(false)}
            >
              All Scholarships
            </NavLink>
            {isLoggedIn && userRole === "user" && (
              <NavLink
                to="/dashboard/user"
                className={navItemClasses}
                onClick={() => setMenuOpen(false)}
              >
                User Dashboard
              </NavLink>
            )}
            {isLoggedIn && userRole === "admin" && (
              <NavLink
                to="/dashboard/admin"
                className={navItemClasses}
                onClick={() => setMenuOpen(false)}
              >
                Admin Dashboard
              </NavLink>
            )}
            {!isLoggedIn ? (
              <NavLink
                to="/login"
                className={navItemClasses}
                onClick={() => setMenuOpen(false)}
              >
                Login
              </NavLink>
            ) : (
              <button
                onClick={() => {
                  console.log("Logout");
                  setMenuOpen(false);
                }}
                className="text-sm px-3 py-2 w-full text-left rounded-md bg-destructive text-white hover:bg-destructive/90"
              >
                Logout
              </button>
            )}
            {!isLoggedIn && (
              <NavLink to="/registration" className={navItemClasses}>
                Registration
              </NavLink>
            )}
            {/* Theme toggle */}
            <div className="pt-2 pl-3">
              <ThemeToggle />
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;
