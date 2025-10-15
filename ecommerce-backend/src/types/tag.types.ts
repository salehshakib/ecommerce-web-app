import { Document } from 'mongoose';

// tag.type.ts
export interface TagPublicProfile {
  id: string;
  name: string;
  description?: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITag extends Document {
  name: string;
  description?: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  getPublicProfile(): TagPublicProfile;
}
