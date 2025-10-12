import { type Request, type Response } from 'express';

import { AuthService } from '@/services/auth/auth.service';

import { asyncHandler } from '@/utils/async-handler';

import type { ApiResponse } from '@/types/api-response';

export class LoginController {
  constructor(private authService: AuthService) {}

  login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const result = await this.authService.login(req.body);

    // console.log(result);

    const response: ApiResponse = {
      success: true,
      message: 'Login successful',
      data: { ...result },
    };

    res.status(200).json(response);
  });
}
