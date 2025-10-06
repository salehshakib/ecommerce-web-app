import { Router } from 'express';
import { AuthController } from '@/controllers/auth.controller.js';
import { AuthService } from '@/services/auth.service.js';
import { UserRepository } from '@/repositories/user.repository.js';
import { validate } from '@/middlewares/validate.js';
import { registerSchema, loginSchema } from '@/validators/auth.validator.js';

const router = Router();

// Dependency injection
const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

// Routes
router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);

export default router;
