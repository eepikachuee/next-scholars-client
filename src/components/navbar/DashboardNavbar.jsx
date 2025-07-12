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
    <header className="w-full px-4 py-3 shadow-sm bg-white dark:bg-gray-900 md:z-10 md:relative">
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
          <ThemeToggle />
          <Button size="sm" variant="destructive" onClick={handleSignOutUser}>
            Logout
          </Button>
        </nav>

        {/* Mobile Drawer */}
        <div className="md:hidden">
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

                <ThemeToggle />
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    handleSignOutUser();
                    setOpen(false);
                  }}
                >
                  Logout
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
