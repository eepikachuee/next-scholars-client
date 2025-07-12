import { NavLink } from "react-router";

const navItemClasses = ({ isActive }) =>
  `block px-4 py-2 text-sm rounded hover:bg-muted transition ${
    isActive ? "text-primary font-semibold" : "text-muted-foreground"
  }`;

const UserSidebar = ({ mobile }) => {
  return (
    <div className={`flex flex-col gap-2 ${mobile ? "" : "p-4"}`}>
      <NavLink to="/dashboard" className={navItemClasses}>
        My Profile
      </NavLink>
      <NavLink to="/dashboard/user/applications" className={navItemClasses}>
        My Application
      </NavLink>
      <NavLink to="/dashboard/user/reviews" className={navItemClasses}>
        My Reviews
      </NavLink>
    </div>
  );
};

export default UserSidebar;
