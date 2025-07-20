import { useContext } from "react";
import { Outlet } from "react-router";
import { AuthContext } from "../providers/AuthContext";
import DashboardNavbar from "../components/navbar/DashboardNavbar";

// Sidebar components
import UserSidebar from "../components/menu/UserSidebar";
import ModeratorSidebar from "../components/menu/ModeratorSidebar";
import AdminSidebar from "../components/menu/AdminSidebar";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);

  // fallback role — you can fetch role from DB or context
  const role = user?.role || "user";

  const renderSidebar = () => {
    switch (role) {
      case "admin":
        return <AdminSidebar />;
      case "moderator":
        return <ModeratorSidebar />;
      default:
        return <UserSidebar />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Mobile Navbar */}
      <DashboardNavbar />

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar for desktop only */}
        <aside className="hidden md:block w-64 bg-[#f8f4ee] dark:bg-[#2a2524] border-r min-h-screen">
          {renderSidebar()}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
