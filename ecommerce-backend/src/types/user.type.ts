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
