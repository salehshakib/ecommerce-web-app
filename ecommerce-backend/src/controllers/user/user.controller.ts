import { type Request, type Response } from 'express';

import { UserService } from '@/services/user.service';

import { UnauthorizedError } from '@/utils/api-error';
import { asyncHandler } from '@/utils/async-handler';

import type { ApiResponse } from '@/types/api-response';

export class UserController {
  constructor(private userService: UserService) {} // GET /users/all (Fetches all users)

  getAllUsers = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const results = await this.userService.getAllUsers();

    const response: ApiResponse = {
      success: true,
      message: 'All users fetched successfully',
      data: results,
    };

    res.status(200).json(response);
  }); // GET /users/:id (Fetches user by ID)

  getUserById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!id) {
      throw new UnauthorizedError('User ID is required in path');
    } // Assuming UserService method for fetching by ID is named getProfileById

    const result = await this.userService.getProfileById(id);

    const response: ApiResponse = {
      success: true,
      message: 'User profile fetched successfully',
      data: result,
    };

    res.status(200).json(response);
  }); // PATCH /users/:id (Updates user by ID)

  updateUserById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!id) {
      throw new UnauthorizedError('User ID is required in path');
    } // Assuming UserService method for updating by ID is named updateProfileById

    const result = await this.userService.updateProfileById(id, req.body);

    const response: ApiResponse = {
      success: true,
      message: 'User profile updated successfully',
      data: result,
    };

    res.status(200).json(response);
  }); // DELETE /users/:id (Deletes user by ID)

  deleteUserById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!id) {
      throw new UnauthorizedError('User ID is required in path');
    } // Assuming UserService method for deleting by ID is named deleteProfileById

    await this.userService.deleteProfileById(id);

    res.status(204).send();
  });
}
