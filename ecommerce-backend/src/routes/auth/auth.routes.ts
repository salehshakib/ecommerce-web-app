import { Router } from 'express';

import profileRoutes from '@/routes/auth/profile.routes';

import { AuthController } from '@/controllers/auth/auth.controller';
// import { AuthController } from "@/controllers/auth/auth.controller";
import { AuthService } from '@/services/auth/auth.service';
import { UserRepository } from '@/repositories/user.repository';

import { loginSchema, registerSchema } from '@/validators/auth.validator';

import { authenticate } from '@/middlewares/auth.middleware';
import { validate } from '@/middlewares/validate';

const authRoutes = Router();

// Dependency injection
const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

// Public routes
authRoutes.post('/register', validate(registerSchema), authController.register);
authRoutes.post('/login', validate(loginSchema), authController.login);

// Protected routes
authRoutes.use('/profile', profileRoutes);
// authRoutes.get('/profile', authenticate, authController.getMyProfile);
// authRoutes.get('/profile/:id', authenticate, authController.getProfileById);

// authRoutes.put('/profile', authenticate, authController.updateProfile);
// authRoutes.patch('/profile/:id', authenticate, authController.updateProfile);
// authRoutes.delete('/profile', authenticate, authController.deleteProfile);

export default authRoutes;
