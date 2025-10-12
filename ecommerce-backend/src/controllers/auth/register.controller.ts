import { type Request, type Response } from 'express';

import { AuthService } from '@/services/auth/auth.service';

import { asyncHandler } from '@/utils/async-handler';

import type { ApiResponse } from '@/types/api-response';

export class RegisterController {
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
}
