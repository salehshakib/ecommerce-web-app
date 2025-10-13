import { NotFoundError } from '@/utils/api-error';

import { AuthResponse } from '@/types/auth.type';
import type { IUser } from '@/models/user.model';
import type { UserRepository } from '@/repositories/user.repository';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getAllUsers(): Promise<AuthResponse[]> {
    const allUsers = await this.userRepository.find();
    return allUsers.map((user) => (user as any).getPublicProfile());
  }

  async getProfileById(userId: string): Promise<AuthResponse> {
    const found = await this.userRepository.findById(userId);

    if (!found) {
      throw new NotFoundError('User not found');
    }

    return (found as any).getPublicProfile();
  }

  async updateProfileById(id: string, updates: Partial<IUser>): Promise<AuthResponse> {
    const updatedUser = await this.userRepository.update(id, updates);

    if (!updatedUser) {
      throw new NotFoundError('User not found or update failed');
    }

    return (updatedUser as any).getPublicProfile();
  }

  async deleteProfileById(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
