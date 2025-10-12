import { TokenService } from '@/services/auth/token.service';
import { UserRepository } from '@/repositories/user.repository';

import { UnauthorizedError } from '@/utils/api-error';

import { AuthResponse, LoginDto } from '@/types/auth.type';

export class LoginService {
  constructor(private userRepository: UserRepository) {}

  async login(dto: LoginDto): Promise<AuthResponse> {
    // Find user
    const user = await this.userRepository.findByEmailOrPhoneWithPassword(dto.identifier);

    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }

    // Validate user status
    this.validateUserStatus(user);

    // Verify password
    await this.verifyPassword(user, dto.password);

    // Generate token
    const token = TokenService.generate(user);

    return {
      ...user.getPublicProfile(),
      token,
    };
  }

  private validateUserStatus(user: any): void {
    if (user.status === 'disabled') {
      throw new UnauthorizedError('Account is disabled');
    }
  }

  private async verifyPassword(user: any, password: string): Promise<void> {
    const isPasswordValid = await user.verifyPassword(password);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid credentials');
    }
  }
}
