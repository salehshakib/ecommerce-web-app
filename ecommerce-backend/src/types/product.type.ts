import mongoose, { Document } from 'mongoose';

export interface ProductPublicProfile {
  id: string;
  name: string;
  description?: string | null;
  brandId: string;
  tagIds: string[];
  categoryId: string;
  productPrices: string[];
  sku?: string | null;
  stock?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProduct extends Document {
  name: string;
  description?: string | null;
  brandId: mongoose.Types.ObjectId;
  tagIds: mongoose.Types.ObjectId[];
  categoryId: mongoose.Types.ObjectId;
  productPrices: mongoose.Types.ObjectId[];
  sku?: string | null;
  stock?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  getPublicProfile(): ProductPublicProfile;
}
