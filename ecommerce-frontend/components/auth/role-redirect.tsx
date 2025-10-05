"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

export default function RoleRedirect() {
  const { profile, token, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && token && profile) {
      // Redirect based on role
      if (profile.role === "admin") {
        router.push("/admin");
      } else if (profile.role === "user") {
        router.push("/user/orders");
      } else {
        // Default fallback
        router.push("/");
      }
    }
  }, [profile, token, isLoading, router]);

  return null; // This component doesn't render anything
}