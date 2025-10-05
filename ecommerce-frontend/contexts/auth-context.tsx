"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ProfileResponse, User } from "@/types/auth";
import { useProfileQuery } from "@/hooks/queries/use-profile-query";

interface AuthContextType {
  profile: ProfileResponse | null;
  token: string | null;
  isLoading: boolean;
  isAdmin: boolean;
  isUser: boolean;
  login: (authToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Use profile query with isEnabled based on token
  const {
    data: profile,
    isLoading: isProfileLoading,
    error: profileError,
  } = useProfileQuery(!!token);

  useEffect(() => {
    // Check for stored auth data on component mount
    const initAuth = () => {
      try {
        const storedToken = localStorage.getItem("authToken");

        if (storedToken) {
          setToken(storedToken);
        }
      } catch (error) {
        console.error("Error restoring authentication:", error);
        // Clear potentially corrupted auth data
        localStorage.removeItem("authToken");
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = (authToken: string) => {
    setToken(authToken);
    // Store auth token in localStorage
    localStorage.setItem("authToken", authToken);
    // Profile will be fetched automatically by the profile query
  };

  const logout = () => {
    setToken(null);
    // Clear auth data from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");

    // Redirect to login page
    window.location.href = "/login";
  };

  const value = {
    profile: profile || null,
    token,
    isLoading: isLoading || isProfileLoading,
    isAdmin: profile?.role === "admin",
    isUser: profile?.role === "user",
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
