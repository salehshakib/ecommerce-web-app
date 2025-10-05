import { User } from "@/types/auth";

export const AUTH_STORAGE_KEYS = {
  TOKEN: "authToken",
  USER_DATA: "userData",
  IS_LOGGED_IN: "isLoggedIn",
} as const;

export const saveAuthData = (token: string, user: User): void => {
  localStorage.setItem(AUTH_STORAGE_KEYS.TOKEN, token);
  localStorage.setItem(AUTH_STORAGE_KEYS.USER_DATA, JSON.stringify(user));
  localStorage.setItem(AUTH_STORAGE_KEYS.IS_LOGGED_IN, "true");
};

export const clearAuthData = (): void => {
  localStorage.removeItem(AUTH_STORAGE_KEYS.TOKEN);
  localStorage.removeItem(AUTH_STORAGE_KEYS.USER_DATA);
  localStorage.removeItem(AUTH_STORAGE_KEYS.IS_LOGGED_IN);
};

export const getStoredToken = (): string | null => {
  return localStorage.getItem(AUTH_STORAGE_KEYS.TOKEN);
};

export const getStoredUser = (): User | null => {
  try {
    const userData = localStorage.getItem(AUTH_STORAGE_KEYS.USER_DATA);
    return userData ? JSON.parse(userData) : null;
  } catch {
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  try {
    return (
      localStorage.getItem(AUTH_STORAGE_KEYS.IS_LOGGED_IN) === "true" &&
      !!getStoredToken()
    );
  } catch {
    return false;
  }
};

export const isAdmin = (): boolean => {
  const user = getStoredUser();
  return isAuthenticated() && user?.role === "admin";
};

export const isUser = (): boolean => {
  const user = getStoredUser();
  return isAuthenticated() && user?.role === "user";
};
