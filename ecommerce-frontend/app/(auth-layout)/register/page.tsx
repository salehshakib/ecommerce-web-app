"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { z } from "zod";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { userRegister } from "@/hooks/mutations/use-auth-mutations";
import { registerSchema, type RegisterFormData } from "@/schemas/auth.schema";

export default function RegisterPage() {
  const [formData, setFormData] = useState<RegisterFormData>({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      // Validate form data including password confirmation
      registerSchema.parse(formData);

      // Register user with API
      const response = await userRegister({
        userName: formData.userName,
        email: formData.email,
        password: formData.password,
      });

      console.log("Registration successful:", response);

      // Redirect to login page after successful registration
      router.push("/login");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        // Handle API errors
        setErrors({
          general:
            error instanceof Error
              ? error.message
              : "Registration failed. Please try again.",
        });
      }
      setLoading(false);
    }
  };

  return (
    <div className="pt-8 pb-16 px-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-wider mb-4">REGISTER</h1>
          <p className="text-muted-foreground">
            Create your account to get started
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          {errors.general && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm">
              {errors.general}
            </div>
          )}

          <div>
            <Input
              type="text"
              name="userName"
              placeholder="Username"
              value={formData.userName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-none focus:outline-none focus:border-primary"
              required
            />
            {errors.userName && (
              <p className="text-red-500 text-xs mt-1">{errors.userName}</p>
            )}
          </div>

          <div>
            <Input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-none focus:outline-none focus:border-primary"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-none focus:outline-none focus:border-primary"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-500 hover:text-gray-700" />
              ) : (
                <Eye className="h-5 w-5 text-gray-500 hover:text-gray-700" />
              )}
            </button>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-none focus:outline-none focus:border-primary"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5 text-gray-500 hover:text-gray-700" />
              ) : (
                <Eye className="h-5 w-5 text-gray-500 hover:text-gray-700" />
              )}
            </button>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div className="space-y-4">
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-none hover:bg-gray-800 transition-colors"
            >
              {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
            </Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-black hover:text-gray-700 font-medium transition-colors"
                >
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
