import Loading from "@/components/loading/Loading";
import { AuthContext } from "@/providers/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router";

const UserRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  // const location = useLocation();
  // console.log(location);

  if (loading) return <Loading />;
  if (user.role === "user") return children;
  return <Navigate to="/" replace="true" />;
};

export default UserRoute;
