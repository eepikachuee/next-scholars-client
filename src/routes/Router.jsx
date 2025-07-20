import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Registration from "../pages/Registration";
import Login from "@/pages/Login";
import Scholarships from "@/pages/Scholarships";
import PrivateRoute from "@/providers/PriveteRoute";
import DashboardLayout from "@/layouts/DashboardLayout";
import MyProfile from "@/pages/dashboard/MyProfile";
import AddScholarship from "@/pages/dashboard/Moderator/AddScholarship";
import ManageScholarships from "@/pages/dashboard/Moderator/ManageScholarships";
import ScholarshipDetails from "@/pages/ScholarshipDetails";
import CheckoutPage from "@/pages/CheckoutPage";
import MyApplications from "@/pages/dashboard/user/MyApplications";
import MyReviews from "@/pages/dashboard/user/MyReviews";
import AllReviews from "@/pages/dashboard/Moderator/AllReviews";
import AllAppliedScholarships from "@/pages/dashboard/Moderator/AllAppliedScholarships";
import AdminManageUsers from "@/pages/dashboard/Admin/AdminManageUsers";
import AdminRoute from "./AdminRoute";
import ModeratorRoute from "./ModeratorRoute";
import AnalyticsDashboard from "@/pages/dashboard/AnalyticsDashboard";

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
      {
        path: "/scholarships/:id",
        element: (
          <PrivateRoute>
            <ScholarshipDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/checkout/:id",
        element: (
          <PrivateRoute>
            <CheckoutPage></CheckoutPage>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "user", element: <AnalyticsDashboard /> },

      // User routes
      {
        path: "user/myProfile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "user/applications",
        element: (
          <PrivateRoute>
            <MyApplications />
          </PrivateRoute>
        ),
      },
      {
        path: "user/reviews",
        element: (
          <PrivateRoute>
            <MyReviews />
          </PrivateRoute>
        ),
      },

      // Moderator routes
      // { path: "moderator", element: <AnalyticsDashboard /> },
      {
        path: "moderator/myProfile",
        element: (
          <PrivateRoute>
            <ModeratorRoute>
              <MyProfile />
            </ModeratorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "moderator/manage-scholarships",
        element: (
          <PrivateRoute>
            <ModeratorRoute>
              <ManageScholarships />
            </ModeratorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "moderator/reviews",
        element: (
          <PrivateRoute>
            <ModeratorRoute>
              <AllReviews />
            </ModeratorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "moderator/applied",
        element: (
          <PrivateRoute>
            <ModeratorRoute>
              <AllAppliedScholarships />
            </ModeratorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "moderator/add-scholarship",
        element: (
          <PrivateRoute>
            <ModeratorRoute>
              <AddScholarship />
            </ModeratorRoute>
          </PrivateRoute>
        ),
      },

      // Admin routes
      // { path: "admin", element: <AnalyticsDashboard /> },
      {
        path: "admin/myProfile",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <MyProfile />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "admin/add-scholarship",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AddScholarship />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "admin/manage-scholarships",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageScholarships />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "admin/manage-applications",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllAppliedScholarships />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "admin/manage-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AdminManageUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "admin/manage-reviews",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllReviews />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
