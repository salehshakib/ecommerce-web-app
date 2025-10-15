import mongoose, { Model, Schema } from 'mongoose';

import type { IOrder, OrderPublicProfile } from '@/types/order.type';

export interface IOrderModel extends Model<IOrder> {}

const OrderSchema = new Schema<IOrder, IOrderModel>(
  {
    cartId: {
      type: Schema.Types.ObjectId,
      ref: 'Cart',
      required: true,
      index: true,
    },
    contactInfo: {
      firstName: { type: String, required: true, trim: true },
      lastName: { type: String, required: true, trim: true },
      email: { type: String, trim: true, default: null },
      phone: { type: String, required: true, trim: true },
      address: { type: String, required: true, trim: true },
      state: { type: String, trim: true, default: null },
      country: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
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
OrderSchema.methods.getPublicProfile = function (): OrderPublicProfile {
  return {
    id: this._id.toString(),
    cartId: this.cartId.toString(),
    contactInfo: this.contactInfo,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

// --- Export ---
export const Order =
  (mongoose.models.Order as IOrderModel) ||
  mongoose.model<IOrder, IOrderModel>('Order', OrderSchema);
