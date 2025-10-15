import { Document } from 'mongoose';

export type UserRole = 'user' | 'admin' | 'owner';
export type UserStatus = 'active' | 'pending' | 'disabled';

export interface UserPublicProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  role: UserRole;
  status: UserStatus;
  emailVerifiedAt?: Date | null;
  profileImage?: string | null;
  createdAt: Date;
  updatedAt: Date;
  token?: string;
}

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  passwordHash: string;
  role: UserRole;
  status: UserStatus;
  emailVerifiedAt?: Date | null;
  profileImage?: string | null;
  createdAt: Date;
  updatedAt: Date;

  setPassword(plain: string): Promise<void>;
  verifyPassword(plain: string): Promise<boolean>;
  getPublicProfile(): UserPublicProfile;
}
