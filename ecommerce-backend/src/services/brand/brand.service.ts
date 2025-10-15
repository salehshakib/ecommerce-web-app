import { BrandRepository } from '@/repositories/brand.respository';

import { BadRequestError, ConflictError, NotFoundError } from '@/utils/api-error';

import { BrandPublicProfile } from '@/types/brand.type';
import type { IBrand } from '@/types/brand.type';

export class BrandService {
  private repo: BrandRepository;

  constructor(repo: BrandRepository) {
    this.repo = repo;
  }

  async getAll(): Promise<BrandPublicProfile[]> {
    const brands = await this.repo.find();
    return brands.map((brand) => brand.getPublicProfile());
  }

  async getActive(): Promise<BrandPublicProfile[]> {
    const brands = await this.repo.findActiveBrands();
    return brands.map((brand) => brand.getPublicProfile());
  }

  async getById(id: string): Promise<BrandPublicProfile> {
    const brand = await this.repo.findById(id);
    if (!brand) throw new NotFoundError('Brand not found');
    return brand.getPublicProfile();
  }

  async create(payload: Partial<IBrand>): Promise<BrandPublicProfile> {
    if (!payload.name) throw new BadRequestError('Name is required');

    const existing = await this.repo.findByName(payload.name);
    if (existing) throw new ConflictError('Brand already exists');

    const brand = await this.repo.create(payload);
    return brand.getPublicProfile();
  }

  async update(id: string, payload: Partial<IBrand>): Promise<BrandPublicProfile> {
    if (payload.name) {
      const existing = await this.repo.findByName(payload.name);
      if (existing && existing.id !== id) {
        throw new ConflictError('Brand with this name already exists');
      }
    }

    const brand = await this.repo.update(id, payload);
    if (!brand) throw new NotFoundError('Brand not found');
    return brand.getPublicProfile();
  }

  async delete(id: string): Promise<void> {
    const brand = await this.repo.findById(id);
    if (!brand) throw new NotFoundError('Brand not found');
    await this.repo.delete(id);
  }

  async toggleStatus(id: string): Promise<BrandPublicProfile> {
    const brand = await this.repo.findById(id);
    if (!brand) throw new NotFoundError('Brand not found');

    const updatedBrand = await this.repo.update(id, {
      isActive: !brand.isActive,
    });
    return updatedBrand!.getPublicProfile();
  }
}
