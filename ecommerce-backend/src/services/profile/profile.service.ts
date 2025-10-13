// import { NotFoundError } from '@/utils/api-error';

// import { AuthResponse } from '@/types/auth.type';
// import type { IUser } from '@/models/user.model';
// import type { UserRepository } from '@/repositories/user.repository';

// export class ProfileService {
//   constructor(private userRepository: UserRepository) {}

//   async getProfileByToken(user: IUser): Promise<AuthResponse> {
//     const found = await this.userRepository.findById(user.id);

//     if (!found) {
//       throw new NotFoundError('User not found');
//     }

//     return (found as any).getPublicProfile();
//   }

//   async getProfileById(userId: string): Promise<AuthResponse> {
//     const found = await this.userRepository.findById(userId);

//     if (!found) {
//       throw new NotFoundError('User not found');
//     }

//     return (found as any).getPublicProfile();
//   }

//   async updateProfileByToken(user: IUser, updates: Partial<IUser>): Promise<AuthResponse> {
//     const updatedUser = await this.userRepository.update(user.id, updates);

//     if (!updatedUser) {
//       throw new NotFoundError('User not found or update failed');
//     }

//     return (updatedUser as any).getPublicProfile();
//   }

//   async updateProfileById(id: string, updates: Partial<IUser>): Promise<AuthResponse> {
//     const updatedUser = await this.userRepository.update(id, updates);

//     if (!updatedUser) {
//       throw new NotFoundError('User not found or update failed');
//     }

//     return (updatedUser as any).getPublicProfile();
//   }

//   async deleteProfileByToken(user: IUser): Promise<void> {
//     await this.userRepository.delete(user.id);
//   }

//   async deleteProfileById(id: string): Promise<void> {
//     await this.userRepository.delete(id);
//   }
// }

import { NotFoundError } from '@/utils/api-error';

import { AuthResponse } from '@/types/auth.type';
import type { IUser } from '@/models/user.model';
import type { UserRepository } from '@/repositories/user.repository';

export class ProfileService {
  constructor(private userRepository: UserRepository) {}

  async getProfile(user: IUser): Promise<AuthResponse> {
    const found = await this.userRepository.findById(user.id);

    if (!found) {
      throw new NotFoundError('User not found');
    }

    return (found as any).getPublicProfile();
  }

  async updateProfile(user: IUser, updates: Partial<IUser>): Promise<AuthResponse> {
    const updatedUser = await this.userRepository.update(user.id, updates);

    if (!updatedUser) {
      throw new NotFoundError('User not found or update failed');
    }

    return (updatedUser as any).getPublicProfile();
  }

  async deleteProfile(user: IUser): Promise<void> {
    await this.userRepository.delete(user.id);
  }
}
