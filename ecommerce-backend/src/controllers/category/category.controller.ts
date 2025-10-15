import { NextFunction, Request, Response } from 'express';

import { CategoryService } from '@/services/category.service';

export class CategoryController {
  private service: CategoryService;

  constructor(service: CategoryService) {
    this.service = service;
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.getAll();
      res.status(200).json({ success: true, message: 'Categories fetched successfully', data });
    } catch (error) {
      next(error);
    }
  }

  async getActive(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.getActive();
      res
        .status(200)
        .json({ success: true, message: 'Active categories fetched successfully', data });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.getById(req.params.id);
      res.status(200).json({ success: true, message: 'Category fetched successfully', data });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.create(req.body);
      res.status(201).json({ success: true, message: 'Category created successfully', data });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.update(req.params.id, req.body);
      res.status(200).json({ success: true, message: 'Category updated successfully', data });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await this.service.delete(req.params.id);
      res.status(200).json({ success: true, message: 'Category deleted successfully' });
    } catch (error) {
      next(error);
    }
  }

  async toggleStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.toggleStatus(req.params.id);
      res.status(200).json({
        success: true,
        message: `Category ${data.isActive ? 'activated' : 'deactivated'} successfully`,
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}
