import { Router } from 'express';

import { AuthController } from '@/controllers/auth/auth.controller';
import { ProfileController } from '@/controllers/auth/profile.controller';
import { AuthService } from '@/services/auth/auth.service';
import { UserRepository } from '@/repositories/user.repository';

import { authenticate } from '@/middlewares/auth.middleware';

const profileRoutes = Router();

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const profileController = new AuthController(authService);

profileRoutes.get('/', authenticate, profileController.getMyProfile);
profileRoutes.get('/:id', authenticate, profileController.getProfileById);
// profileRoutes.put("/", authenticate, profileController.updateProfile);
// profileRoutes.patch("/:id", authenticate, profileController.updateProfile);
// profileRoutes.delete("/", authenticate, profileController.deleteProfile);

export default profileRoutes;
