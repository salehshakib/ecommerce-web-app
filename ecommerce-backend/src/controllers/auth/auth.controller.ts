import { LoginController } from '@/controllers/auth/login.controller';
import { ProfileController } from '@/controllers/auth/profile.controller';
import { RegisterController } from '@/controllers/auth/register.controller';
import { AuthService } from '@/services/auth/auth.service';

export class AuthController {
  private registerController: RegisterController;
  private loginController: LoginController;
  private profileController: ProfileController;

  constructor(private authService: AuthService) {
    this.registerController = new RegisterController(authService);
    this.loginController = new LoginController(authService);
    this.profileController = new ProfileController(authService);
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
  get getMyProfile() {
    return this.profileController.getMyProfile;
  }

  // Delegate to ProfileController
  get getProfileById() {
    return this.profileController.getProfileById;
  }

  get updateProfile() {
    return this.profileController.updateProfile;
  }

  get updateProfileById() {
    return this.profileController.updateProfileById;
  }

  get deleteProfile() {
    return this.profileController.deleteProfile;
  }

  get deleteProfileById() {
    return this.profileController.deleteProfileById;
  }
}
