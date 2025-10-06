import { User, type IUser } from '@/models/user.model.js';

export class UserRepository {
  async findById(id: string): Promise<IUser | null> {
    return User.findById(id);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return User.findByEmail(email);
  }

  async findByPhone(phone: string): Promise<IUser | null> {
    return User.findByPhone(phone);
  }

  async findByEmailOrPhone(identifier: string): Promise<IUser | null> {
    return User.findByEmailOrPhone(identifier);
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

  async create(userData: Partial<IUser>): Promise<IUser> {
    const user = new User(userData);
    return user.save();
  }

  async update(id: string, userData: Partial<IUser>): Promise<IUser | null> {
    return User.findByIdAndUpdate(id, userData, { new: true, runValidators: true });
  }

  async delete(id: string): Promise<IUser | null> {
    return User.findByIdAndDelete(id);
  }

  async existsByEmail(email: string): Promise<boolean> {
    const count = await User.countDocuments({ email: email.toLowerCase().trim() });
    return count > 0;
  }

  async existsByPhone(phone: string): Promise<boolean> {
    const count = await User.countDocuments({ phone: phone.trim() });
    return count > 0;
  }
}
