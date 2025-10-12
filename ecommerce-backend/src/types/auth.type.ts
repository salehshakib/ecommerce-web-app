import type { UserPublicProfile } from '@/types/user.type.ts';

export interface RegisterUserDto {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  profileImage?: string;
}

export interface LoginDto {
  identifier: string; // email or phone
  password: string;
}

export type AuthResponse = UserPublicProfile;

export interface JwtPayload {
  id: string;
  email: string;
  role: string;
}
