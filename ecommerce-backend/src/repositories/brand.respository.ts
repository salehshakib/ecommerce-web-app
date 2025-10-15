import { BaseRepository } from '@/repositories/base.repository';

import { IBrand } from '@/types/brand.type';

import { Brand } from '@/models/brand.model';

export class BrandRepository extends BaseRepository<IBrand> {
  constructor() {
    super(Brand);
  }

  async getById(id: string): Promise<IBrand | null> {
    return this.model.findById(id).exec();
  }

  async getByName(name: string): Promise<IBrand | null> {
    return this.model.findOne({ name }).exec();
  }

  async updateById(id: string, payload: Partial<IBrand>): Promise<IBrand | null> {
    return this.model.findByIdAndUpdate(id, payload, { new: true }).exec();
  }

  async findAllActive(): Promise<IBrand[]> {
    return this.model.find({ isActive: true }).sort({ createdAt: -1 }).exec();
  }
}
