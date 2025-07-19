import Loading from "@/components/loading/Loading";
import { AuthContext } from "@/providers/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router";

const ModeratorRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  //   const location = useLocation();
  //   console.log(location);

  if (loading) return <Loading />;
  if (user.role === "moderator") return children;
  return <Navigate to="/" replace="true" />;
};

export default ModeratorRoute;
