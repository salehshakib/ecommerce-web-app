"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loading } from "@/components/ui/loading";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { changePassword } from "@/hooks/mutations/use-auth-mutations";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validate passwords
    if (newPassword !== confirmPassword) {
      setError("New passwords don't match");
      setLoading(false);
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }

    if (!currentPassword) {
      setError("Current password is required");
      setLoading(false);
      return;
    }

    try {
      await changePassword({
        oldPassword: currentPassword,
        newPassword,
      });

      setSuccess("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error("Password change error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to change password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center min-h-screen py-8 px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-wider">Change Password</h2>
          <p className="text-muted-foreground mt-2">
            Update your account password
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 text-sm rounded">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <Input
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-none focus:outline-none focus:border-primary"
                required
                disabled={loading}
                placeholder="Enter current password "
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 mt-6"
                disabled={loading}
              >
                {showCurrentPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                )}
              </button>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <Input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-none focus:outline-none focus:border-primary"
                required
                minLength={8}
                disabled={loading}
                placeholder="Enter new password (min. 8 characters)"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 mt-6"
                disabled={loading}
              >
                {showNewPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                )}
              </button>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-none focus:outline-none focus:border-primary"
                required
                minLength={8}
                disabled={loading}
                placeholder="Confirm your new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 mt-6"
                disabled={loading}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                )}
              </button>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-3 rounded-none hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    UPDATING...
                  </div>
                ) : (
                  "UPDATE PASSWORD"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
