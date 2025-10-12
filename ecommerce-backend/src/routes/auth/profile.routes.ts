import { Router } from 'express';

import { AuthController } from '@/controllers/auth/auth.controller';
import { ProfileController } from '@/controllers/auth/profile.controller';
import { AuthService } from '@/services/auth/auth.service';
import { UserRepository } from '@/repositories/user.repository';

import { userProfileSchema } from '@/validators/auth.validator';

import { authenticate } from '@/middlewares/auth.middleware';
import { validate } from '@/middlewares/validate';

const profileRoutes = Router();

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const profileController = new AuthController(authService);

profileRoutes.get('/', authenticate, profileController.getMyProfile);
profileRoutes.get('/:id', authenticate, profileController.getProfileById);

profileRoutes.patch(
  '/update',
  authenticate,
  validate(userProfileSchema),
  profileController.updateProfile,
);
profileRoutes.patch(
  '/update/:id',
  authenticate,
  validate(userProfileSchema),
  profileController.updateProfileById,
);

profileRoutes.delete('/delete', authenticate, profileController.deleteProfile);
profileRoutes.delete('/delete/:id', authenticate, profileController.deleteProfileById);

export default profileRoutes;
