import { type Request, type Response } from 'express';
import { AuthService } from '@/services/auth.service.js';
import { asyncHandler } from '@/utils/async-handler.js';
import type { ApiResponse } from '@/types/api-response.js';

export class AuthController {
  constructor(private authService: AuthService) {}

  register = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const result = await this.authService.register(req.body);

    const response: ApiResponse = {
      success: true,
      message: 'User registered successfully',
      data: result,
    };

    res.status(201).json(response);
  });

  login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const result = await this.authService.login(req.body);

    const response: ApiResponse = {
      success: true,
      message: 'Login successful',
      data: result,
    };

    res.status(200).json(response);
  });
}
