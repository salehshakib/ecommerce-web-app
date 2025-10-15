import { LoginController } from '@/controllers/auth/login.controller';
import { RegisterController } from '@/controllers/auth/register.controller';
import { AuthService } from '@/services/auth/auth.service';

export class AuthController {
  private registerController: RegisterController;
  private loginController: LoginController;

  constructor(private authService: AuthService) {
    this.registerController = new RegisterController(this.authService);
    this.loginController = new LoginController(this.authService);
  }

  // Delegate to RegisterController
  get register() {
    return this.registerController.register;
  }

  // Delegate to LoginController
  get login() {
    return this.loginController.login;
  }

  // Delegate to ProfileController
}
