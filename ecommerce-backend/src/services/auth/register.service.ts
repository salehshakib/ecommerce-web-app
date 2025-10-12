import { PasswordValidator } from '@/services/auth/password-validator.service';
import { TokenService } from '@/services/auth/token.service';
import { UserRepository } from '@/repositories/user.repository';

import { ConflictError } from '@/utils/api-error';

import type { AuthResponse, RegisterUserDto } from '@/types/auth.type';

import { User } from '@/models/user.model';

export class RegisterService {
  constructor(private userRepository: UserRepository) {}

  async register(dto: RegisterUserDto): Promise<AuthResponse> {
    // Validate uniqueness
    await this.validateUniqueFields(dto);

    // Validate password
    PasswordValidator.validate(dto.password);

    // Create user
    const user = await this.createUser(dto);

    // Generate token
    const token = TokenService.generate(user);

    return {
      ...user.getPublicProfile(),
      token,
    };
  }

  private async validateUniqueFields(dto: RegisterUserDto): Promise<void> {
    const emailExists = await this.userRepository.existsByEmail(dto.email);
    if (emailExists) {
      throw new ConflictError('Email already registered');
    }

    if (dto.phone) {
      const phoneExists = await this.userRepository.existsByPhone(dto.phone);
      if (phoneExists) {
        throw new ConflictError('Phone number already registered');
      }
    }
  }

  private async createUser(dto: RegisterUserDto) {
    const user = new User({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      phone: dto.phone || null,
      profileImage: dto.profileImage || null,
      role: 'user',
      status: 'active',
    });

    await user.setPassword(dto.password);
    await user.save();

    return user;
  }
}
