import mongoose, { Model, Schema } from 'mongoose';

import type { CategoryPublicProfile, ICategory } from '@/types/category.types';

export interface ICategoryModel extends Model<ICategory> {}

const CategorySchema = new Schema<ICategory, ICategoryModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxlength: 100,
      index: true,
    },
    description: {
      type: String,
      trim: true,
      default: null,
      maxlength: 500,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret: any) => {
        ret.id = ret._id.toString();
        delete ret._id;
        return ret;
      },
    },
    toObject: { virtuals: true },
  },
);

// Indexes

CategorySchema.index({ createdAt: -1 });

// Pre-validation cleanup
CategorySchema.pre('validate', function () {
  if (this.name) this.name = this.name.trim();
  if (this.description === '') this.description = null as any;
});

// Instance method
CategorySchema.methods.getPublicProfile = function (): CategoryPublicProfile {
  return {
    id: this._id.toString(),
    name: this.name,
    description: this.description ?? null,
    isActive: this.isActive,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

export const Category =
  (mongoose.models.Category as ICategoryModel) ||
  mongoose.model<ICategory, ICategoryModel>('Category', CategorySchema);
