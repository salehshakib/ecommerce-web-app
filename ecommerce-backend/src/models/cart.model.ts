import mongoose, { Model, Schema } from 'mongoose';

import { CartPublicProfile, ICart } from '@/types/cart.type';

export interface ICartModel extends Model<ICart> {}

const CartSchema = new Schema<ICart, ICartModel>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
      index: true,
    },
    productPriceId: {
      type: Schema.Types.ObjectId,
      ref: 'ProductPrice',
      required: true,
      index: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
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

// Instance method
CartSchema.methods.getPublicProfile = function (): CartPublicProfile {
  return {
    id: this._id.toString(),
    productId: this.productId.toString(),
    productPriceId: this.productPriceId.toString(),
    quantity: this.quantity,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

export const Cart =
  (mongoose.models.Cart as ICartModel) || mongoose.model<ICart, ICartModel>('Cart', CartSchema);
