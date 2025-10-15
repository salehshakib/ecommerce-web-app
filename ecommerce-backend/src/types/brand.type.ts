import mongoose, { Document } from 'mongoose';

export interface BrandPublicProfile {
  id: string;
  name: string;
  description?: string | null;
  image?: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBrand extends Document {
  name: string;
  description?: string | null;
  image?: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  getPublicProfile(): BrandPublicProfile;
}
