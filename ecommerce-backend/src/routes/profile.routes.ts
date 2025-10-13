import { Router } from 'express';

import { ProfileController } from '@/controllers/profile/profile.controller';
import { ProfileService } from '@/services/profile/profile.service';
import { UserRepository } from '@/repositories/user.repository';

import { userProfileSchema } from '@/validators/profile.validator';

import { validate } from '@/middlewares/validate';

const profileRoutes = Router();

const userRepository = new UserRepository();
const profileService = new ProfileService(userRepository);
const profileController = new ProfileController(profileService);

profileRoutes.get('/', profileController.getMyProfile);
profileRoutes.get('/:id', profileController.getProfileById);

profileRoutes.patch(
  '/',

  validate(userProfileSchema),
  profileController.updateProfile,
);
profileRoutes.patch(
  '/:id',

  validate(userProfileSchema),
  profileController.updateProfileById,
);

profileRoutes.delete('/', profileController.deleteProfile);
profileRoutes.delete('/:id', profileController.deleteProfileById);

export default profileRoutes;
