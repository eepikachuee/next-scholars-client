import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Registration from "../pages/Registration";
import Login from "@/pages/Login";
import Scholarships from "@/pages/Scholarships";
import PrivateRoute from "@/providers/PriveteRoute";

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
]);
