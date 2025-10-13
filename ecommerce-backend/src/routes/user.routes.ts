import { Router } from 'express';

import { UserController } from '@/controllers/user/user.controller';
import { UserService } from '@/services/user/user.service';
import { UserRepository } from '@/repositories/user.repository';

import { userProfileSchema } from '@/validators/profile.validator';

import { validate } from '@/middlewares/validate';

const userRoutes = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRoutes.get('/:id', userController.getUserById);
userRoutes.patch('/:id', validate(userProfileSchema), userController.updateUserById);
userRoutes.delete('/:id', userController.deleteUserById);

export default userRoutes;
