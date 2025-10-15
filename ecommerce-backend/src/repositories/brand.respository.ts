import { BaseRepository } from '@/repositories/base.repository';

import { IBrand } from '@/types/brand.type';
import type { FilterQuery } from 'mongoose';

import { Brand } from '@/models/brand.model';

export class BrandRepository extends BaseRepository<IBrand> {
  constructor() {
    super(Brand);
  }

  async findActiveBrands(): Promise<IBrand[]> {
    return this.find({ isActive: true } as FilterQuery<IBrand>);
  }

  async findByName(name: string): Promise<IBrand | null> {
    return this.findOne({ name: name.trim() } as FilterQuery<IBrand>);
  }

  async existsByName(name: string): Promise<boolean> {
    const count = await this.count({ name: name.trim() } as FilterQuery<IBrand>);
    return count > 0;
  }

  async findActiveById(id: string): Promise<IBrand | null> {
    const brand = await this.findById(id);
    return brand && brand.isActive ? brand : null;
  }
}
