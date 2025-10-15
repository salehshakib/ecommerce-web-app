import { BaseRepository } from '@/repositories/base.repository';

import { ICategory } from '@/types/category.types';
import type { FilterQuery } from 'mongoose';

import { Category } from '@/models/category.model';

export class CategoryRepository extends BaseRepository<ICategory> {
  constructor() {
    super(Category);
  }

  async findActiveCategories(): Promise<ICategory[]> {
    return this.find({ isActive: true } as FilterQuery<ICategory>);
  }

  async findByName(name: string): Promise<ICategory | null> {
    return this.findOne({ name: name.trim() } as FilterQuery<ICategory>);
  }

  async existsByName(name: string): Promise<boolean> {
    const count = await this.count({ name: name.trim() } as FilterQuery<ICategory>);
    return count > 0;
  }

  async findActiveById(id: string): Promise<ICategory | null> {
    const category = await this.findById(id);
    return category && category.isActive ? category : null;
  }
}
