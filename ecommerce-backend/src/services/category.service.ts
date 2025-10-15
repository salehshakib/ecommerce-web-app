import { CategoryRepository } from '@/repositories/category.repository';

import { BadRequestError, ConflictError, NotFoundError } from '@/utils/api-error';

import { CategoryPublicProfile } from '@/types/category.types';
import type { ICategory } from '@/types/category.types';

export class CategoryService {
  private repo: CategoryRepository;

  constructor(repo: CategoryRepository) {
    this.repo = repo;
  }

  async getAll(): Promise<CategoryPublicProfile[]> {
    const categories = await this.repo.find();
    return categories.map((category) => category.getPublicProfile());
  }

  async getActive(): Promise<CategoryPublicProfile[]> {
    const categories = await this.repo.findActiveCategories();
    return categories.map((category) => category.getPublicProfile());
  }

  async getById(id: string): Promise<CategoryPublicProfile> {
    const category = await this.repo.findById(id);
    if (!category) throw new NotFoundError('Category not found');
    return category.getPublicProfile();
  }

  async create(payload: Partial<ICategory>): Promise<CategoryPublicProfile> {
    if (!payload.name) throw new BadRequestError('Name is required');

    const existing = await this.repo.findByName(payload.name);
    if (existing) throw new ConflictError('Category already exists');

    const category = await this.repo.create(payload);
    return category.getPublicProfile();
  }

  async update(id: string, payload: Partial<ICategory>): Promise<CategoryPublicProfile> {
    if (payload.name) {
      const existing = await this.repo.findByName(payload.name);
      if (existing && existing.id !== id) {
        throw new ConflictError('Category with this name already exists');
      }
    }

    const category = await this.repo.update(id, payload);
    if (!category) throw new NotFoundError('Category not found');
    return category.getPublicProfile();
  }

  async delete(id: string): Promise<void> {
    const category = await this.repo.findById(id);
    if (!category) throw new NotFoundError('Category not found');
    await this.repo.delete(id);
  }

  async toggleStatus(id: string): Promise<CategoryPublicProfile> {
    const category = await this.repo.findById(id);
    if (!category) throw new NotFoundError('Category not found');

    const updatedCategory = await this.repo.update(id, {
      isActive: !category.isActive,
    });
    return updatedCategory!.getPublicProfile();
  }
}
