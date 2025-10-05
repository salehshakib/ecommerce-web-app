"use client";

import React from "react";
import { useAuth } from "@/contexts/auth-context";
import { Loading } from "@/components/ui/loading";

interface AdminRouteGuardProps {
  children: React.ReactNode;
}

export default function AdminRouteGuard({ children }: AdminRouteGuardProps) {
  const { profile, token, isLoading, isAdmin } = useAuth();

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <Loading message="Checking admin access..." size="md" fullScreen={true} />
    );
  }

  // Check if user has token and is admin
  if (!token || !profile || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground">You need admin privileges to access this page.</p>
          <a href="/login" className="text-primary hover:underline mt-4 inline-block">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}