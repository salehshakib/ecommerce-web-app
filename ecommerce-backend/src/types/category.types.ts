import { Document } from 'mongoose';

export interface CategoryPublicProfile {
  id: string;
  name: string;
  description?: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategory extends Document {
  name: string;
  description?: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  getPublicProfile(): CategoryPublicProfile;
}
