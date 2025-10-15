import { Router } from 'express';

import { CategoryController } from '@/controllers/category/category.controller';
import { CategoryService } from '@/services/category.service';
import { CategoryRepository } from '@/repositories/category.repository';

import { categorySchema, categoryUpdateSchema } from '@/validators/category.validator';

import { authenticate } from '@/middlewares/auth.middleware';
import { validate } from '@/middlewares/validate';

const categoryRoutes = Router();

const categoryRepository = new CategoryRepository();
const categoryService = new CategoryService(categoryRepository);
const categoryController = new CategoryController(categoryService);

// Bind methods to maintain 'this' context
categoryRoutes.get('/', authenticate, categoryController.getAll);
categoryRoutes.get('/active', categoryController.getActive);
categoryRoutes.get('/:id', categoryController.getById);

categoryRoutes.post('/', authenticate, validate(categorySchema), categoryController.create);
categoryRoutes.patch(
  '/:id',
  authenticate,
  validate(categoryUpdateSchema),
  categoryController.update,
);
categoryRoutes.delete('/:id', authenticate, categoryController.delete);
categoryRoutes.patch('/:id/toggle-status', authenticate, categoryController.toggleStatus);

export default categoryRoutes;
