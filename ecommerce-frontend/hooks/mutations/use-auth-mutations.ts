"use client";

import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/lib/api/endpoints/auth.api";
import { createAuthorizedFetch } from "@/lib/api/utils/authorized-fetch";
import { createPublicFetch } from "@/lib/api/utils/public-fetch";
import { clearAuthData } from "@/utils/auth/localStorage";

// Types
export interface RegisterData {
  userName: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
}

// Mutation functions
const userRegister = async (userData: RegisterData) => {
  return createPublicFetch(authApi.REGISTER, {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

const userLogin = async (loginData: LoginData) => {
  return createPublicFetch(authApi.LOGIN, {
    method: "POST",
    body: JSON.stringify(loginData),
  });
};

const adminLogin = async (loginData: LoginData) => {
  return createPublicFetch(authApi.ADMIN_LOGIN, {
    method: "POST",
    body: JSON.stringify(loginData),
  });
};

const changePassword = async (passwordData: ChangePasswordData) => {
  return createAuthorizedFetch(authApi.CHANGE_PASSWORD, {
    method: "PUT",
    body: JSON.stringify(passwordData),
  });
};

const logout = async () => {
  // Clear auth data from localStorage (no API call needed)
  clearAuthData();
  return { success: true };
};

// Export mutation functions for direct use
export { userRegister, userLogin, adminLogin, changePassword, logout };

// Mutation hooks
export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: userRegister,
  });
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: userLogin,
  });
};

export const useAdminLoginMutation = () => {
  return useMutation({
    mutationFn: adminLogin,
  });
};

export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: changePassword,
    // Unauthorized errors are handled by authorized fetch
  });
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // Redirect to login after successful logout
      window.location.href = "/login";
    },
  });
};