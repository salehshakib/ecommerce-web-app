import mongoose, { Model, Schema } from 'mongoose';

import { IProductPrice } from '@/types/product-price.type';

export type DiscountType = 'percentage' | 'fixed';

export interface IProductPriceModel extends Model<IProductPrice> {}

const ProductPriceSchema = new Schema<IProductPrice, IProductPriceModel>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
      index: true,
    },
    volume: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
    },
    discountType: {
      type: String,
      enum: ['percentage', 'fixed'],
      default: 'percentage',
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

// Optional helper virtual to compute final price
ProductPriceSchema.virtual('finalPrice').get(function (this: IProductPrice) {
  if (!this.discount || this.discount <= 0) return this.price;
  if (this.discountType === 'percentage') return this.price - (this.price * this.discount) / 100;
  return Math.max(0, this.price - this.discount);
});

export const ProductPrice =
  (mongoose.models.ProductPrice as IProductPriceModel) ||
  mongoose.model<IProductPrice, IProductPriceModel>('ProductPrice', ProductPriceSchema);
