import express from 'express';

import { BrandController } from '@/controllers/brand/brand.controller';
import { BrandService } from '@/services/brand.service';
import { BrandRepository } from '@/repositories/brand.respository';

import { brandSchema } from '@/validators/brand.validator';

import { authenticate } from '@/middlewares/auth.middleware';
import { validate } from '@/middlewares/validate';

const brandRoutes = express.Router();

const repo = new BrandRepository();
const service = new BrandService(repo);
const controller = new BrandController(service);

brandRoutes.get('/', controller.getAll);
brandRoutes.get('/active', controller.getActive);

brandRoutes.get('/:id', controller.getById);
brandRoutes.post('/', authenticate, validate(brandSchema), controller.create);
brandRoutes.patch('/:id', authenticate, validate(brandSchema), controller.update);
brandRoutes.delete('/:id', authenticate, controller.delete);

export default brandRoutes;
