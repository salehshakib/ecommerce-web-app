import type { IUser } from '@/models/user.model';

import { User } from '@/models/user.model';

export class UserRepository {
  // Find user with password field (normally excluded)
  async findByEmailWithPassword(email: string): Promise<IUser | null> {
    return User.findOne({ email: email.toLowerCase().trim() }).select('+passwordHash');
  }

  // Find user with password field (normally excluded)
  async findByPhoneWithPassword(phone: string): Promise<IUser | null> {
    return User.findOne({ phone: phone.trim() }).select('+passwordHash');
  }

  // Find by email or phone with password
  async findByEmailOrPhoneWithPassword(identifier: string): Promise<IUser | null> {
    const trimmed = identifier.trim();
    if (trimmed.includes('@')) {
      return this.findByEmailWithPassword(trimmed);
    }
    return this.findByPhoneWithPassword(trimmed);
  }

  // Check existence without loading full document
  async existsByEmail(email: string): Promise<boolean> {
    const count = await User.countDocuments({ email: email.toLowerCase().trim() });
    return count > 0;
  }

  // Check existence without loading full document
  async existsByPhone(phone: string): Promise<boolean> {
    const count = await User.countDocuments({ phone: phone.trim() });
    return count > 0;
  }
}
