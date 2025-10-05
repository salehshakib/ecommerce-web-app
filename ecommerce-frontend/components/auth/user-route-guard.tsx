"use client";

import React from "react";
import { Loading } from "@/components/ui/loading";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

interface UserRouteGuardProps {
  children: React.ReactNode;
}

export const UserRouteGuard: React.FC<UserRouteGuardProps> = ({ children }) => {
  const { profile, token, isLoading, isUser, isAdmin } = useAuth();
  const router = useRouter();

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <Loading message="Verifying access..." size="md" fullScreen={true} />
    );
  }

  // If not authenticated, show login prompt
  if (!token || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
          <p className="text-muted-foreground mb-4">You need to login to access this page.</p>
          <a href="/login" className="text-primary hover:underline">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  // If admin user trying to access user routes, show elegant error
  if (isAdmin) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-lg mx-auto text-center">
          {/* Access Denied Icon */}
          <div className="relative mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                <ShieldAlert className="w-10 h-10 text-red-600" />
              </div>
            </div>
          </div>

          {/* Access Denied Message */}
          <div className="mb-8">
            <h1 className="text-3xl font-light mb-4 tracking-wider text-foreground">
              ACCESS <span className="text-red-600">RESTRICTED</span>
            </h1>
            <div className="h-px w-24 bg-red-300 mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Admin accounts cannot access user routes. Please use the admin
              panel for administrative functions.
            </p>
          </div>

          {/* Status Badge */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
              <span className="text-sm font-medium text-red-600">
                Admin User Detected
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/admin">
              <Button className="bg-primary hover:bg-primary/90 px-6 py-3">
                <ShieldAlert className="w-4 h-4 mr-2" />
                Go to Admin Panel
              </Button>
            </Link>

            <Button
              variant="outline"
              className="border-primary/20 text-primary hover:bg-primary px-6 py-3"
              onClick={() => router.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>

          {/* Additional Help */}
          <div className="mt-12 pt-8 border-t border-border/20">
            <p className="text-sm text-muted-foreground">
              Need to access user features? Please log in with a regular user
              account.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default UserRouteGuard;
