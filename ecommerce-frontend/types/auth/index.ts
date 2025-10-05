export interface LoginResponse {
  token: string;
  user: User;
}

export interface LoginCredentials {
  email?: string;
  userName?: string;
  password: string;
}

export interface RegisterCredentials {
  userName: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  user: {
    id: string;
    username: string;
    email: string;
  };
}

export interface User {
  id: string;
  userName: string;
  email: string;
  role: "user" | "admin";
  username?: string;
  avatar?: string;
}

export interface ProfileResponse {
  _id: string;
  userName: string;
  email: string;
  role: "user" | "admin";
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UpdateProfileData {
  userName?: string;
  email?: string;
  avatar?: string;
  // Add other updatable fields as needed
}
