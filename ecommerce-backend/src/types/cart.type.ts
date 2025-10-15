import mongoose, { Document } from 'mongoose';

export interface CartPublicProfile {
  id: string;
  productId: string;
  productPriceId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICart extends Document {
  productId: mongoose.Types.ObjectId;
  productPriceId: mongoose.Types.ObjectId;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;

  getPublicProfile(): CartPublicProfile;
}
