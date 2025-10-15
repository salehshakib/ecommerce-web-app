import { NextFunction, Request, Response } from 'express';

import { BrandService } from '@/services/brand/brand.service';

export class BrandController {
  private service: BrandService;

  constructor(service: BrandService) {
    this.service = service;
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.getAll();
      res.status(200).json({ success: true, message: 'Brands fetched successfully', data });
    } catch (error) {
      next(error);
    }
  }

  async getActive(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.getActive();
      res.status(200).json({ success: true, message: 'Active brands fetched successfully', data });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.getById(req.params.id);
      res.status(200).json({ success: true, message: 'Brand fetched successfully', data });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.create(req.body);
      res.status(201).json({ success: true, message: 'Brand created successfully', data });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.update(req.params.id, req.body);
      res.status(200).json({ success: true, message: 'Brand updated successfully', data });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await this.service.delete(req.params.id);
      res.status(200).json({ success: true, message: 'Brand deleted successfully' });
    } catch (error) {
      next(error);
    }
  }

  async toggleStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.toggleStatus(req.params.id);
      res.status(200).json({
        success: true,
        message: `Brand ${data.isActive ? 'activated' : 'deactivated'} successfully`,
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}
