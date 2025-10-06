import { User, type IUser } from '@/models/user.model.js';

export class UserRepository {
  // Complex query: Find user with password field (normally excluded)
  async findByEmailWithPassword(email: string): Promise<IUser | null> {
    return User.findOne({ email: email.toLowerCase().trim() }).select('+passwordHash');
  }

  // Complex query: Find user with password field (normally excluded)
  async findByPhoneWithPassword(phone: string): Promise<IUser | null> {
    return User.findOne({ phone: phone.trim() }).select('+passwordHash');
  }

  // Complex query: Find by email or phone with password
  async findByEmailOrPhoneWithPassword(identifier: string): Promise<IUser | null> {
    const trimmed = identifier.trim();
    if (trimmed.includes('@')) {
      return this.findByEmailWithPassword(trimmed);
    }
    return this.findByPhoneWithPassword(trimmed);
  }

  // Complex query: Check existence without loading full document
  async existsByEmail(email: string): Promise<boolean> {
    const count = await User.countDocuments({ email: email.toLowerCase().trim() });
    return count > 0;
  }

  // Complex query: Check existence without loading full document
  async existsByPhone(phone: string): Promise<boolean> {
    const count = await User.countDocuments({ phone: phone.trim() });
    return count > 0;
  }

  // Complex operation: Create and save user
  async create(userData: Partial<IUser>): Promise<IUser> {
    const user = new User(userData);
    return user.save();
  }
}
