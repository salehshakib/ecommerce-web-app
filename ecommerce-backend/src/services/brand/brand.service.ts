import { BrandRepository } from '@/repositories/brand.respository';

import { BadRequestError, NotFoundError } from '@/utils/api-error';

import { IBrand } from '@/types/brand.type';

export class BrandService {
  private repo: BrandRepository;

  constructor(repo: BrandRepository) {
    this.repo = repo;
  }

  async getAll(): Promise<any[]> {
    const brands = await this.repo.findAllActive();
    return brands.map((b) => b.getPublicProfile());
  }

  async getById(id: string): Promise<any> {
    const brand = await this.repo.getById(id);
    if (!brand) throw new NotFoundError('Brand not found');
    return brand.getPublicProfile();
  }

  async create(payload: Partial<IBrand>): Promise<any> {
    if (!payload.name) throw new BadRequestError('Name is required');
    const existing = await this.repo.getByName(payload.name);
    if (existing) throw new BadRequestError('Brand already exists');

    const brand = await this.repo.create(payload);
    return brand.getPublicProfile();
  }

  async update(id: string, payload: Partial<IBrand>): Promise<any> {
    const brand = await this.repo.updateById(id, payload);
    if (!brand) throw new NotFoundError('Brand not found');
    return brand.getPublicProfile();
  }

  async delete(id: string): Promise<void> {
    const brand = await this.repo.getById(id);
    if (!brand) throw new NotFoundError('Brand not found');
    await this.repo.delete(id);
  }
}
