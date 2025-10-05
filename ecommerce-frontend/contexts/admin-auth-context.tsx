"use client";

import { ProfileResponse, User } from "@/types/auth";
import {
  isAuthenticated as checkIsAuthenticated,
  clearAuthData,
  getStoredToken,
  getStoredUser,
  isAdmin,
} from "@/utils/auth";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AdminAuthContextType {
  user: User | null;
  token: string | null;
  profile: ProfileResponse | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (userData: User, authToken: string) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  fetchProfile: () => Promise<ProfileResponse | null>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(
  undefined
);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState(false);

  useEffect(() => {
    // Check for stored admin auth data on component mount
    const storedUser = getStoredUser();
    const storedToken = getStoredToken();
    const authStatus = checkIsAuthenticated();
    const adminStatus = isAdmin();

    if (storedUser && storedToken && authStatus && adminStatus) {
      setUser(storedUser);
      setToken(storedToken);
      setIsAuthenticated(true);
      setIsAdminUser(true);
    }
  }, []);

  // Note: Profile fetching is now handled by AppDataContext to prevent duplicate calls

  const fetchProfile = async (): Promise<ProfileResponse | null> => {
    // This is deprecated - profile is now fetched by AppDataContext
    console.warn(
      "fetchProfile called on AdminAuthContext - use AppDataContext instead"
    );
    return null;
  };

  const login = (userData: User, authToken: string) => {
    setUser(userData);
    setToken(authToken);
    setIsAuthenticated(true);
    setIsAdminUser(userData.role === "admin");
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    setIsAdminUser(false);
    clearAuthData();
  };

  const updateUser = (updatedData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updatedData };
      setUser(updatedUser);
      // Note: localStorage update is handled by the auth utilities
    }
  };

  const value = {
    user,
    token,
    profile,
    isAuthenticated,
    isAdmin: isAdminUser,
    login,
    logout,
    updateUser,
    fetchProfile,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};
