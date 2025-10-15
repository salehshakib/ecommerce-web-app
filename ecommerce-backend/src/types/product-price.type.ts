import mongoose, { Document } from 'mongoose';

export type DiscountType = 'percentage' | 'fixed';

export interface ProductPricePublicProfile {
  id: string;
  productId: string;
  volume: string;
  price: number;
  discount: number;
  discountType: DiscountType;
  finalPrice?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProductPrice extends Document {
  productId: mongoose.Types.ObjectId;
  volume: string;
  price: number;
  discount?: number;
  discountType?: DiscountType;
  createdAt: Date;
  updatedAt: Date;
}
