import { NavLink } from "react-router";

const navItemClasses = ({ isActive }) =>
  `block px-4 py-2 text-sm rounded hover:bg-muted transition ${
    isActive ? "text-primary font-semibold" : "text-muted-foreground"
  }`;

const AdminSidebar = ({ mobile }) => {
  return (
    <div className={`flex flex-col gap-2 ${mobile ? "" : "p-4"}`}>
      <NavLink to="/dashboard/admin/profile" className={navItemClasses}>
        Admin Profile
      </NavLink>
      <NavLink to="/dashboard/admin/add-scholarship" className={navItemClasses}>
        Add Scholarship
      </NavLink>
      <NavLink
        to="/dashboard/admin/manage-scholarships"
        className={navItemClasses}
      >
        Manage Scholarship
      </NavLink>
      <NavLink
        to="/dashboard/admin/manage-applications"
        className={navItemClasses}
      >
        Manage Applied Application
      </NavLink>
      <NavLink to="/dashboard/admin/manage-users" className={navItemClasses}>
        Manage Users
      </NavLink>
      <NavLink to="/dashboard/admin/manage-reviews" className={navItemClasses}>
        Manage Review
      </NavLink>
    </div>
  );
};

export default AdminSidebar;
