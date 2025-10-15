import { Request, Response } from 'express';

import { SettingsService } from '@/services/settings.service';

import { asyncHandler } from '@/utils/async-handler';

import type { ISettings } from '@/types/settings.type';

export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  getSettings = asyncHandler(async (req: Request, res: Response) => {
    const settings = await this.settingsService.getSettings();
    res.status(200).json({
      success: true,
      data: settings,
      message: settings ? 'Settings retrieved successfully' : 'No settings found',
    });
  });

  updateSettings = asyncHandler(async (req: Request, res: Response) => {
    const settingsData = req.body as Partial<ISettings>;
    const updatedSettings = await this.settingsService.updateSettings(settingsData);

    res.status(200).json({
      success: true,
      data: updatedSettings,
      message: 'Settings updated successfully',
    });
  });
}
