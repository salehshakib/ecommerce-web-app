import { Router } from 'express';

import { AuthController } from '@/controllers/auth/auth.controller';
import { AuthService } from '@/services/auth/auth.service';
import { UserRepository } from '@/repositories/user.repository';

import { loginSchema, registerSchema } from '@/validators/auth.validator';

import { validate } from '@/middlewares/validate';

const authRoutes = Router();

// Dependency injection
const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

// Public routes
authRoutes.post('/register', validate(registerSchema), authController.register);
authRoutes.post('/login', validate(loginSchema), authController.login);

export default authRoutes;
