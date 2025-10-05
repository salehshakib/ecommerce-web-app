"use client";

import React from "react";
import { useAuth } from "@/contexts/auth-context";
import { Loading } from "@/components/ui/loading";

interface ProtectedRouteGuardProps {
  children: React.ReactNode;
}

export default function ProtectedRouteGuard({ children }: ProtectedRouteGuardProps) {
  const { token, isLoading } = useAuth();

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <Loading message="Verifying access..." size="md" fullScreen={true} />
    );
  }

  // Check if user has token (any authenticated user)
  if (!token) {
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

  return <>{children}</>;
}