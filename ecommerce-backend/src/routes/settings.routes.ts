import { Router } from 'express';

import { SettingsController } from '@/controllers/settings/settings.controller';
import { SettingsService } from '@/services/settings.service';
import { SettingsRepository } from '@/repositories/settings.repository';

import { settingsSchema } from '@/validators/settings.validator';

import { authenticate } from '@/middlewares/auth.middleware';
import { validate } from '@/middlewares/validate';

const settingsRoutes = Router();

// Dependency injection setup
const settingsRepository = new SettingsRepository();
const settingsService = new SettingsService(settingsRepository);
const settingsController = new SettingsController(settingsService);

settingsRoutes.get('/', settingsController.getSettings);
settingsRoutes.patch(
  '/',
  authenticate,
  validate(settingsSchema),
  settingsController.updateSettings,
);

export default settingsRoutes;
