import React, { useContext } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { AuthContext } from "@/providers/AuthContext"; // update the path as needed
import { useForm } from "react-hook-form";
import { Link } from "react-router";

const Login = () => {
  const { handleSignInUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      await handleSignInUser(email, password);
      toast.success("Login successful");
      reset();
      // Optional: navigate("/dashboard/user")
    } catch (err) {
      toast.error(err.message || "Login failed");
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
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
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
      </div>
    </div>
  );
};

export default Login;
