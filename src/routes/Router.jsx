import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Registration from "../pages/Registration";
import Login from "@/pages/Login";
import Scholarships from "@/pages/Scholarships";
import PrivateRoute from "@/providers/PriveteRoute";
import DashboardLayout from "@/layouts/DashboardLayout";
import MyProfile from "@/pages/dashboard/MyProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/registration",
        element: <Registration></Registration>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/scholarships",
        element: (
          <PrivateRoute>
            <Scholarships />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // User routes
      {
        path: "/dashboard",
        element: <MyProfile />,
      },
      // { path: "user/applications", element: <MyApplications /> },
      // { path: "user/reviews", element: <MyReviews /> },

      // Moderator routes
      {
        path: "/dashboard",
        element: <MyProfile />,
      },
      // {
      //   path: "moderator/manage-scholarships",
      //   element: <ManageScholarships />,
      // },
      // { path: "moderator/reviews", element: <AllReviews /> },
      // { path: "moderator/applied", element: <AllAppliedScholarships /> },
      // { path: "moderator/add-scholarship", element: <AddScholarship /> },

      // Admin routes
      {
        path: "/dashboard",
        element: <MyProfile />,
      },
      // { path: "admin/add-scholarship", element: <AddScholarship /> },
      // { path: "admin/manage-scholarships", element: <ManageScholarships /> },
      // { path: "admin/manage-applications", element: <ManageApplications /> },
      // { path: "admin/manage-users", element: <ManageUsers /> },
      // { path: "admin/manage-reviews", element: <ManageReviews /> },
    ],
  },
]);
