import jwt from 'jsonwebtoken';
import { UserRepository } from '@/repositories/user.repository.js';
import { jwtConfig } from '@/config/index.js';
import { ConflictError, UnauthorizedError, BadRequestError } from '@/utils/api-error.js';
import type { IUser } from '@/models/user.model.js';
import type { RegisterUserDto, LoginDto, AuthResponse, JwtPayload } from '@/types/auth.type.js';

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async register(dto: RegisterUserDto): Promise<AuthResponse> {
    // Check if email already exists
    const emailExists = await this.userRepository.existsByEmail(dto.email);
    if (emailExists) {
      throw new ConflictError('Email already registered');
    }

    // Check if phone already exists (if provided)
    if (dto.phone) {
      const phoneExists = await this.userRepository.existsByPhone(dto.phone);
      if (phoneExists) {
        throw new ConflictError('Phone number already registered');
      }
    }

    // Validate password strength
    this.validatePassword(dto.password);

    // Create user
    const user = await this.userRepository.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      phone: dto.phone || null,
      profileImage: dto.profileImage || null,
      role: 'user',
      status: 'active',
    });

    // Set password
    await user.setPassword(dto.password);
    await user.save();

    // Generate token
    const token = this.generateToken(user);

    return {
      user: user.getPublicProfile(),
      token,
    };
  }

  async login(dto: LoginDto): Promise<AuthResponse> {
    // Find user by email or phone
    const user = await this.userRepository.findByEmailOrPhoneWithPassword(dto.identifier);

    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }

    // Check if user is active
    if (user.status === 'disabled') {
      throw new UnauthorizedError('Account is disabled');
    }

    // Verify password
    const isPasswordValid = await user.verifyPassword(dto.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid credentials');
    }

    // Generate token
    const token = this.generateToken(user);

    return {
      user: user.getPublicProfile(),
      token,
    };
  }

  private generateToken(user: IUser): string {
    const payload: JwtPayload = {
      id: (user._id as any).toString(),
      email: user.email,
      role: user.role,
    };

    return jwt.sign(payload, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    } as jwt.SignOptions);
  }

  private validatePassword(password: string): void {
    if (password.length < 8) {
      throw new BadRequestError('Password must be at least 8 characters long');
    }

    // Add more password validation rules as needed
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (!hasUpperCase || !hasLowerCase || !hasNumber) {
      throw new BadRequestError(
        'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      );
    }
  }
}
