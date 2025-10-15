import mongoose, { Model, Schema } from 'mongoose';

import type { BrandPublicProfile, IBrand } from '@/types/brand.type';

export interface IBrandModel extends Model<IBrand> {}

const BrandSchema = new Schema<IBrand, IBrandModel>(
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
    image: {
      type: String,
      trim: true,
      default: null,
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

// --- Indexes ---
BrandSchema.index({ name: 1 });
BrandSchema.index({ isActive: 1 });
BrandSchema.index({ createdAt: -1 });

// --- Pre-validation cleanup ---
BrandSchema.pre('validate', function () {
  if (this.name) this.name = this.name.trim();
  if (this.description === '') this.description = null as any;
  if (this.image === '') this.image = null as any;
});

// --- Instance Method ---
BrandSchema.methods.getPublicProfile = function (): BrandPublicProfile {
  return {
    id: this._id.toString(),
    name: this.name,
    description: this.description ?? null,
    image: this.image ?? null,
    isActive: this.isActive,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

// --- Export ---
export const Brand =
  (mongoose.models.Brand as IBrandModel) ||
  mongoose.model<IBrand, IBrandModel>('Brand', BrandSchema);
