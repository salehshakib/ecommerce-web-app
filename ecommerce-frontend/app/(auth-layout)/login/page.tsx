"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { userLogin, adminLogin } from "@/hooks/mutations/use-auth-mutations";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Try user login first
      let response;
      try {
        response = await userLogin({ email, password });
        console.log("User login successful:", response);
      } catch (userError) {
        // If user login fails, try admin login
        try {
          response = await adminLogin({ email, password });
          console.log("Admin login successful:", response);
        } catch (adminError) {
          throw userError; // Show the original user login error
        }
      }

      // Update the auth context
      login(response.token);

      // Simple redirect - let the route guards handle role-based access
      router.push("/");
    } catch (err) {
      console.error("Login failed:", err);
      setError(
        err instanceof Error ? err.message : "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = () => {
    router.push("/register");
  };

  return (
    <div className="pt-8 pb-16 px-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-wider mb-4">LOGIN</h1>
          <p className="text-muted-foreground">
            Please enter your e-mail and password :
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          <div>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-none focus:outline-none focus:border-primary"
              required
            />
          </div>

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          </div>

          <div className="text-right">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Forgot password ?
            </a>
          </div>

          <div className="space-y-4">
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-none hover:bg-gray-800 transition-colors"
            >
              {loading ? "LOGGING IN..." : "LOGIN"}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleCreateAccount}
              className="w-full py-3 rounded-none border-black text-black hover:bg-black hover:text-white transition-colors bg-transparent"
            >
              CREATE ONE
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
