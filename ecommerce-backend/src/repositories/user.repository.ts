import { BaseRepository } from '@/repositories/base.repository';

import type { IUser } from '@/models/user.model';

import { User } from '@/models/user.model';

export class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(User);
  }

  async findByEmailWithPassword(email: string): Promise<IUser | null> {
    return User.findOne({ email: email.toLowerCase().trim() }).select('+passwordHash');
  }

  async findByPhoneWithPassword(phone: string): Promise<IUser | null> {
    return User.findOne({ phone: phone.trim() }).select('+passwordHash');
  }

  async findByEmailOrPhoneWithPassword(identifier: string): Promise<IUser | null> {
    const trimmed = identifier.trim();
    if (trimmed.includes('@')) {
      return this.findByEmailWithPassword(trimmed);
    }
    return this.findByPhoneWithPassword(trimmed);
  }

  async existsByEmail(email: string): Promise<boolean> {
    const count = await this.count({ email: email.toLowerCase().trim() });
    return count > 0;
  }

  async existsByPhone(phone: string): Promise<boolean> {
    const count = await this.count({ phone: phone.trim() });
    return count > 0;
  }
}
