import Loading from "@/components/loading/Loading";
import { AuthContext } from "@/providers/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  // const location = useLocation();
  // console.log(location);

  if (loading) return <Loading />;
  if (user.role === "admin") return children;
  return <Navigate to="/" replace="true" />;
};

export default AdminRoute;
