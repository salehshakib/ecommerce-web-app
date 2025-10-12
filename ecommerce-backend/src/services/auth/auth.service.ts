import { LoginService } from '@/services/auth/login.service';
import { ProfileService } from '@/services/auth/profile.service';
import { RegisterService } from '@/services/auth/register.service';
import { UserRepository } from '@/repositories/user.repository';

import { AuthResponse, LoginDto, RegisterUserDto } from '@/types/auth.type';

import { IUser } from '@/models/user.model';

export class AuthService {
  private registerService: RegisterService;
  private loginService: LoginService;
  private profileService: ProfileService;

  constructor(private userRepository: UserRepository) {
    this.registerService = new RegisterService(userRepository);
    this.loginService = new LoginService(userRepository);
    this.profileService = new ProfileService(userRepository);
  }

  async register(dto: RegisterUserDto): Promise<AuthResponse> {
    return this.registerService.register(dto);
  }

  async login(dto: LoginDto): Promise<AuthResponse> {
    return this.loginService.login(dto);
  }

  // Get profile from authenticated user (token-based)
  async getProfileByToken(user: IUser): Promise<AuthResponse> {
    return this.profileService.getProfileByToken(user);
  }

  // Get profile by user ID
  async getProfileById(userId: string): Promise<AuthResponse> {
    return this.profileService.getProfileById(userId);
  }

  // Update profile from authenticated user (token-based)
  async updateProfileByToken(user: IUser, updates: Partial<IUser>): Promise<AuthResponse> {
    return this.profileService.updateProfileByToken(user, updates);
  }

  // Update profile by user ID (public access with auth)
  async updateProfileById(id: string, updates: Partial<IUser>): Promise<AuthResponse> {
    return this.profileService.updateProfileById(id, updates);
  }

  // Delete profile from authenticated user (token-based)
  async deleteProfileByToken(user: IUser): Promise<void> {
    return this.profileService.deleteProfileByToken(user);
  }

  // Delete profile by user ID (public access with auth)
  async deleteProfileById(id: string): Promise<void> {
    return this.profileService.deleteProfileById(id);
  }
}
