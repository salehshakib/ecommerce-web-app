import mongoose, { Document, Model, Schema } from 'mongoose';

import type { CouponPublicProfile, DiscountType, ICoupon } from '@/types/coupon.type';

export interface ICouponModel extends Model<ICoupon> {}

const CouponSchema = new Schema<ICoupon, ICouponModel>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      maxlength: 50,
      index: true,
    },
    description: {
      type: String,
      trim: true,
      default: null,
      maxlength: 500,
    },
    discountValue: {
      type: Number,
      required: true,
      min: 0,
    },
    discountType: {
      type: String,
      enum: ['percentage', 'fixed'],
      required: true,
      default: 'percentage',
    },
    minPurchaseAmount: {
      type: Number,
      default: null,
      min: 0,
    },
    maxDiscountAmount: {
      type: Number,
      default: null,
      min: 0,
    },
    startDate: {
      type: Date,
      default: null,
    },
    endDate: {
      type: Date,
      default: null,
    },
    usageLimit: {
      type: Number,
      default: null,
      min: 1,
    },
    usedCount: {
      type: Number,
      default: 0,
      min: 0,
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

// --- Instance method ---
CouponSchema.methods.getPublicProfile = function (): CouponPublicProfile {
  return {
    id: this._id.toString(),
    code: this.code,
    description: this.description ?? null,
    discountValue: this.discountValue,
    discountType: this.discountType,
    minPurchaseAmount: this.minPurchaseAmount ?? null,
    maxDiscountAmount: this.maxDiscountAmount ?? null,
    startDate: this.startDate ?? null,
    endDate: this.endDate ?? null,
    usageLimit: this.usageLimit ?? null,
    usedCount: this.usedCount,
    isActive: this.isActive,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

export const Coupon =
  (mongoose.models.Coupon as ICouponModel) ||
  mongoose.model<ICoupon, ICouponModel>('Coupon', CouponSchema);
