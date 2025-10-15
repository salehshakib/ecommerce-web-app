import { BaseRepository } from '@/repositories/base.repository';

import type { ISettings } from '@/types/settings.type';

import { Settings } from '@/models/settings.model';

export class SettingsRepository extends BaseRepository<ISettings> {
  constructor() {
    super(Settings);
  }

  async getSettings(): Promise<ISettings | null> {
    return this.model.findOne();
  }

  async updateSettings(data: Partial<ISettings>): Promise<ISettings | null> {
    const existing = await this.model.findOne();

    if (existing) {
      Object.assign(existing, data);
      return existing.save();
    }

    // if not found, create new settings document
    return this.model.create(data);
  }
}
