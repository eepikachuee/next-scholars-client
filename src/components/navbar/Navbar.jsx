import { NavLink } from "react-router";
import { Menu } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthContext";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";

import ThemeToggle from "../button/ThemeToggle";

const Navbar = () => {
  const { user, handleSignOutUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const navItemClasses = ({ isActive }) =>
    `transition px-3 py-2 rounded-md text-sm font-medium ${
      isActive ? "text-primary font-semibold" : "text-muted-foreground"
    }`;

  const role = user?.role;

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false); // scrolling down
      } else {
        setShowNavbar(true); // scrolling up
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 px-4 py-3 transition-all duration-300
        ${showNavbar ? "translate-y-0" : "-translate-y-full"}
        backdrop-blur-md bg-white/45 dark:bg-[#0f0f0f]/30 shadow-sm`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-bold text-primary">
          🎓 NextScholars
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-4">
          <NavLink to="/" className={navItemClasses}>
            Home
          </NavLink>
          <NavLink to="/scholarships" className={navItemClasses}>
            Scholarships
          </NavLink>

          {user && role === "user" && (
            <NavLink to="/dashboard/user" className={navItemClasses}>
              User Dashboard
            </NavLink>
          )}
          {user && role === "admin" && (
            <NavLink to="/dashboard/admin" className={navItemClasses}>
              Admin Dashboard
            </NavLink>
          )}
          {user && role === "moderator" && (
            <NavLink to="/dashboard/moderator" className={navItemClasses}>
              Moderator Dashboard
            </NavLink>
          )}

          {!user && (
            <NavLink to="/login" className={navItemClasses}>
              Login
            </NavLink>
          )}
          {!user && (
            <NavLink
              to="/registration"
              className={navItemClasses}
              onClick={() => setOpen(false)}
            >
              Register
            </NavLink>
          )}
          {user && (
            <div className="relative group pr-3">
              {/* Avatar Button */}
              <button className="rounded-full border-2 border-transparent hover:border-amber-600 focus:outline-none transition">
                <img
                  src={user.photoURL}
                  alt="User avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </button>

              {/* Dropdown Menu */}
              <div
                className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-800 text-gray-800 dark:text-white 
                 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                 transition-all duration-300 z-50 p-4 space-y-2"
              >
                <p className="text-sm font-semibold">{user.displayName}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 break-all">
                  {user.email}
                </p>
                <hr className="border-gray-200 dark:border-gray-700" />
                <button
                  onClick={handleSignOutUser}
                  className="w-full text-center text-red-600 hover:underline text-sm"
                >
                  Logout
                </button>
              </div>
            </div>
          )}

          <ThemeToggle />
        </nav>

        {/* Mobile Drawer Trigger */}
        <div className="md:hidden flex">
          {user && (
            <div className="relative group pr-3">
              {/* Avatar Button */}
              <button className="rounded-full border-2 border-transparent hover:border-amber-600 focus:outline-none transition">
                <img
                  src={user.photoURL}
                  alt="User avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </button>

              {/* Dropdown Menu */}
              <div
                className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-800 text-gray-800 dark:text-white 
                 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                 transition-all duration-300 z-50 p-4 space-y-2"
              >
                <p className="text-sm font-semibold">{user.displayName}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 break-all">
                  {user.email}
                </p>
                <hr className="border-gray-200 dark:border-gray-700" />
                <button
                  onClick={handleSignOutUser}
                  className="w-full text-center text-red-600 hover:underline text-sm"
                >
                  Logout
                </button>
              </div>
            </div>
          )}

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-64">
              <SheetHeader>
                <SheetTitle asChild>
                  <VisuallyHidden>Navigation Menu</VisuallyHidden>
                </SheetTitle>
                <SheetDescription className={"font-bold text-2xl"}>
                  Menu
                </SheetDescription>
              </SheetHeader>

              <div className="flex flex-col gap-3 mt-6">
                <NavLink
                  to="/"
                  className={navItemClasses}
                  onClick={() => setOpen(false)}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/scholarships"
                  className={navItemClasses}
                  onClick={() => setOpen(false)}
                >
                  Scholarships
                </NavLink>
                {user && role === "user" && (
                  <NavLink
                    to="/dashboard/user"
                    className={navItemClasses}
                    onClick={() => setOpen(false)}
                  >
                    User Dashboard
                  </NavLink>
                )}
                {user && role === "admin" && (
                  <NavLink
                    to="/dashboard/admin"
                    className={navItemClasses}
                    onClick={() => setOpen(false)}
                  >
                    Admin Dashboard
                  </NavLink>
                )}
                {user && role === "moderator" && (
                  <NavLink
                    to="/dashboard/moderator"
                    className={navItemClasses}
                    onClick={() => setOpen(false)}
                  >
                    Moderator Dashboard
                  </NavLink>
                )}

                {!user && (
                  <NavLink
                    to="/login"
                    className={navItemClasses}
                    onClick={() => setOpen(false)}
                  >
                    Login
                  </NavLink>
                )}
                {!user && (
                  <NavLink
                    to="/registration"
                    className={navItemClasses}
                    onClick={() => setOpen(false)}
                  >
                    Register
                  </NavLink>
                )}

                {/* Optional: Add close on toggle as well if needed */}
                <div className="pl-3">
                  <ThemeToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
