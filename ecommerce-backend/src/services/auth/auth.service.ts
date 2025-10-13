import { LoginService } from '@/services/auth/login.service';
import { RegisterService } from '@/services/auth/register.service';
import { UserRepository } from '@/repositories/user.repository';

import { AuthResponse, LoginDto, RegisterUserDto } from '@/types/auth.type';

export class AuthService {
  private registerService: RegisterService;
  private loginService: LoginService;

  constructor(private userRepository: UserRepository) {
    this.registerService = new RegisterService(userRepository);
    this.loginService = new LoginService(userRepository);
  }

  async register(dto: RegisterUserDto): Promise<AuthResponse> {
    return this.registerService.register(dto);
  }

  async login(dto: LoginDto): Promise<AuthResponse> {
    return this.loginService.login(dto);
  }
}
