import { NextFunction, Request, Response } from 'express';

import { SettingsService } from '@/services/settings.service';

export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  async getSettings(_req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.settingsService.getSettings();
      res.status(200).json({
        success: true,
        message: 'Settings retrieved successfully',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateSettings(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.settingsService.updateSettings(req.body);
      res.status(200).json({
        success: true,
        message: 'Settings updated successfully',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
