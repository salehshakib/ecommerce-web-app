import { type Request, type Response } from 'express';

import { AuthService } from '@/services/auth/auth.service';

import { UnauthorizedError } from '@/utils/api-error';
import { asyncHandler } from '@/utils/async-handler';

import type { ApiResponse } from '@/types/api-response';

export class ProfileController {
  constructor(private authService: AuthService) {}

  // Get own profile using token (no ID needed)
  getMyProfile = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
      throw new UnauthorizedError('User not authenticated');
    }

    const result = await this.authService.getProfileByToken(req.user);

    const response: ApiResponse = {
      success: true,
      message: 'Profile fetched successfully',
      data: result,
    };

    res.status(200).json(response);
  });

  // Get profile by user ID
  getProfileById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!id) {
      throw new UnauthorizedError('User ID is required');
    }

    const result = await this.authService.getProfileById(id);

    const response: ApiResponse = {
      success: true,
      message: 'Profile fetched successfully',
      data: result,
    };

    res.status(200).json(response);
  });
}
