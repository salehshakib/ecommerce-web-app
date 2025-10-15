import express from 'express';

import { BrandController } from '@/controllers/brand/brand.controller';
import { BrandService } from '@/services/brand/brand.service';
import { BrandRepository } from '@/repositories/brand.respository';

import { brandSchema } from '@/validators/brand.validator';

import { authenticate } from '@/middlewares/auth.middleware';
import { validate } from '@/middlewares/validate';

const brandRoutes = express.Router();

const repo = new BrandRepository();
const service = new BrandService(repo);
const controller = new BrandController(service);

brandRoutes.get('/', controller.getAll.bind(controller));
brandRoutes.get('/:id', controller.getById.bind(controller));
brandRoutes.post(
  '/',
  authenticate,
  authenticate,
  validate(brandSchema),
  controller.create.bind(controller),
);
brandRoutes.patch(
  '/:id',
  authenticate,
  authenticate,
  validate(brandSchema),
  controller.update.bind(controller),
);
brandRoutes.delete('/:id', authenticate, authenticate, controller.delete.bind(controller));

export default brandRoutes;
