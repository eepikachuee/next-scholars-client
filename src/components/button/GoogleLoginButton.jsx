import React, { useState, useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { AuthContext } from "../../providers/AuthContext";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router";
import useSaveUser from "@/hooks/useSaveUser";

const GoogleLoginButton = () => {
  const [loading, setLoading] = useState(false);
  const { handleGoogleSignIn } = useContext(AuthContext);
  const { saveUser } = useSaveUser();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await handleGoogleSignIn();
      const user = result.user;

      // Save user to database
      await saveUser({
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: "user",
      });

      toast.success("Logged in with Google");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleGoogleLogin}
      disabled={loading}
      variant="outline"
      className="w-full flex items-center justify-center gap-2 border-gray-300"
    >
      <FcGoogle className="w-5 h-5" />
      {loading ? "Logging in..." : "Continue with Google"}
    </Button>
  );
};

export default GoogleLoginButton;
