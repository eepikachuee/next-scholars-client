import React, { useContext } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { AuthContext } from "@/providers/AuthContext"; // update the path as needed
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import GoogleLoginButton from "@/components/button/GoogleLoginButton";

const Login = () => {
  const { handleSignInUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (data) => {
    try {
      await handleSignInUser(data.email, data.password);
      toast.success("Login successful");
      navigate(from, { replace: true });
    } catch (err) {
      const errorCode = err.code;

      if (errorCode === "auth/user-not-found") {
        setError("email", { message: "No user found with this email." });
      } else if (errorCode === "auth/wrong-password") {
        setError("password", { message: "Incorrect password." });
      } else if (errorCode === "auth/invalid-email") {
        setError("email", { message: "Invalid email format." });
      } else {
        toast.error(err.message || "Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-xl shadow-md p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-primary">
          Login to NextScholars
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>

        <p className="text-sm text-center text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/registration" className="text-primary hover:underline">
            Register
          </Link>
        </p>

        <GoogleLoginButton></GoogleLoginButton>
      </div>
    </div>
  );
};

export default Login;
