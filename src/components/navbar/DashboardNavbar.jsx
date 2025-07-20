import { NavLink } from "react-router";
import { Menu } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthContext";
import { Button } from "../../components/ui/button";
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

// Sidebar components
import UserSidebar from "../../components/menu/UserSidebar";
import ModeratorSidebar from "../../components/menu/ModeratorSidebar";
import AdminSidebar from "../../components/menu/AdminSidebar";

const DashboardNavbar = () => {
  const { user, handleSignOutUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const role = user?.role || "user";

  const renderSidebarMenu = () => {
    switch (role) {
      case "admin":
        return <AdminSidebar mobile />;
      case "moderator":
        return <ModeratorSidebar mobile />;
      default:
        return <UserSidebar mobile />;
    }
  };

  const navItemClasses = ({ isActive }) =>
    `transition px-3 py-2 rounded-md text-sm font-medium ${
      isActive ? "text-primary font-semibold" : "text-muted-foreground"
    }`;

  return (
    <header className="w-full px-4 py-3 shadow-sm md:z-10 md:relative">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <NavLink to="/" className="text-2xl font-bold text-primary">
          🎓 NextScholars
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4">
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
          {user && role === "moderator" && (
            <NavLink to="/dashboard/moderator" className={navItemClasses}>
              Moderator Dashboard
            </NavLink>
          )}
          {user && role === "admin" && (
            <NavLink to="/dashboard/admin" className={navItemClasses}>
              Admin Dashboard
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

        {/* Mobile Drawer */}
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
                  <VisuallyHidden>Dashboard Menu</VisuallyHidden>
                </SheetTitle>
                <SheetDescription>Menu</SheetDescription>
              </SheetHeader>

              <div className="flex flex-col gap-3 mt-6">
                {/* Main Nav */}
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
                {/* Role-based dashboard link */}
                {user && role === "user" && (
                  <NavLink
                    to="/dashboard/user"
                    className={navItemClasses}
                    onClick={() => setOpen(false)}
                  >
                    User Dashboard
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
                {user && role === "admin" && (
                  <NavLink
                    to="/dashboard/admin"
                    className={navItemClasses}
                    onClick={() => setOpen(false)}
                  >
                    Admin Dashboard
                  </NavLink>
                )}

                {/* Sidebar Menu (full) */}
                <div className="border-t pt-4">{renderSidebarMenu()}</div>

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

export default DashboardNavbar;
