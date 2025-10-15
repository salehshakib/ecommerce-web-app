import { SettingsRepository } from '@/repositories/settings.repository';

import { BadRequestError } from '@/utils/api-error';

import type { ISettings, SettingsPublicProfile } from '@/types/settings.type';

export class SettingsService {
  constructor(private settingsRepository: SettingsRepository) {}

  async getSettings(): Promise<SettingsPublicProfile | null> {
    const settings = await this.settingsRepository.getSettings();
    return settings ? settings.getPublicProfile() : null;
  }

  async updateSettings(data: Partial<ISettings>): Promise<SettingsPublicProfile> {
    const updated = await this.settingsRepository.updateSettings(data);

    if (!updated) {
      throw new BadRequestError('Failed to update or create settings.');
    }

    return updated.getPublicProfile();
  }
}
