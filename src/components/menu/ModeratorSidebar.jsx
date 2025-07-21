import { NavLink } from "react-router";

const navItemClasses = ({ isActive }) =>
  `block px-4 py-2 text-sm rounded hover:bg-muted transition ${
    isActive ? "text-primary font-semibold" : "text-muted-foreground"
  }`;

const ModeratorSidebar = ({ mobile }) => {
  return (
    <div className={`flex flex-col gap-2 ${mobile ? "" : "p-4"}`}>
      <NavLink to="/dashboard/moderator" className={navItemClasses}>
        Dashboard
      </NavLink>
      <NavLink to="/dashboard/moderator/myProfile" className={navItemClasses}>
        My Profile
      </NavLink>
      <NavLink
        to="/dashboard/moderator/manage-scholarships"
        className={navItemClasses}
      >
        Manage Scholarships
      </NavLink>
      <NavLink to="/dashboard/moderator/reviews" className={navItemClasses}>
        All Reviews
      </NavLink>
      <NavLink to="/dashboard/moderator/applied" className={navItemClasses}>
        All Applied Scholarship
      </NavLink>
      <NavLink
        to="/dashboard/moderator/add-scholarship"
        className={navItemClasses}
      >
        Add Scholarship
      </NavLink>
    </div>
  );
};

export default ModeratorSidebar;
