import { NotFoundError } from '@/utils/api-error';

import { AuthResponse } from '@/types/auth.type';
import type { IUser } from '@/models/user.model';
import type { UserRepository } from '@/repositories/user.repository';

import { User } from '@/models/user.model';

export class ProfileService {
  constructor(private userRepository: UserRepository) {}

  // Get profile from authenticated user (token-based)
  async getProfileByToken(user: IUser): Promise<AuthResponse> {
    // Fetch the user from DB to ensure latest data
    const found = await User.findById(user.id);

    if (!found) {
      throw new NotFoundError('User not found');
    }

    return found.getPublicProfile();
  }

  // Get profile by user ID (public access with auth)
  async getProfileById(userId: string): Promise<AuthResponse> {
    const found = await User.findById(userId);

    if (!found) {
      throw new NotFoundError('User not found');
    }

    return found.getPublicProfile();
  }
}
