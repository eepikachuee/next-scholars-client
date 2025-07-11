import { NavLink } from "react-router";
import { Menu } from "lucide-react";
import { useContext, useState } from "react";
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

  return (
    <header className="w-full px-4 py-3 shadow-sm bg-white dark:bg-gray-900">
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

          {!user ? (
            <NavLink to="/login" className={navItemClasses}>
              Login
            </NavLink>
          ) : (
            <Button size="sm" variant="destructive" onClick={handleSignOutUser}>
              Logout
            </Button>
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
          <ThemeToggle />
        </nav>

        {/* Mobile Drawer Trigger */}
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
                  <VisuallyHidden>Navigation Menu</VisuallyHidden>
                </SheetTitle>
                <SheetDescription>Menu</SheetDescription>
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

                {!user ? (
                  <NavLink
                    to="/login"
                    className={navItemClasses}
                    onClick={() => setOpen(false)}
                  >
                    Login
                  </NavLink>
                ) : (
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
                <ThemeToggle />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
