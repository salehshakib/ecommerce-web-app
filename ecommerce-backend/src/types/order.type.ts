import mongoose, { Document } from 'mongoose';

export interface OrderContactInfo {
  firstName: string;
  lastName: string;
  email?: string | null;
  phone: string;
  address: string;
  state?: string | null;
  country: string;
  city: string;
}

export interface OrderPublicProfile {
  id: string;
  cartId: string;
  contactInfo: OrderContactInfo;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrder extends Document {
  cartId: mongoose.Types.ObjectId;
  contactInfo: OrderContactInfo;
  createdAt: Date;
  updatedAt: Date;

  getPublicProfile(): OrderPublicProfile;
}
