import { Document } from 'mongoose';

export type DiscountType = 'percentage' | 'fixed';

export interface CouponPublicProfile {
  id: string;
  code: string;
  description?: string | null;
  discountValue: number;
  discountType: DiscountType;
  minPurchaseAmount?: number | null;
  maxDiscountAmount?: number | null;
  startDate?: Date | null;
  endDate?: Date | null;
  usageLimit?: number | null;
  usedCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICoupon extends Document {
  code: string;
  description?: string | null;
  discountValue: number;
  discountType: DiscountType;
  minPurchaseAmount?: number | null;
  maxDiscountAmount?: number | null;
  startDate?: Date | null;
  endDate?: Date | null;
  usageLimit?: number | null;
  usedCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  getPublicProfile(): CouponPublicProfile;
}
