import mongoose, { Model, Schema } from 'mongoose';

import { IProduct, ProductPublicProfile } from '@/types/product.type';

export interface IProductModel extends Model<IProduct> {}

const ProductSchema = new Schema<IProduct, IProductModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
      index: true,
    },
    description: {
      type: String,
      trim: true,
      default: null,
      maxlength: 2000,
    },
    brandId: {
      type: Schema.Types.ObjectId,
      ref: 'Brand',
      required: true,
      index: true,
    },
    tagIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tag',
        index: true,
      },
    ],
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
      index: true,
    },
    productPrices: [
      {
        type: Schema.Types.ObjectId,
        ref: 'ProductPrice',
        index: true,
      },
    ],
    sku: {
      type: String,
      trim: true,
      default: null,
      unique: true,
      sparse: true,
    },
    stock: {
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

// --- Instance Method ---
ProductSchema.methods.getPublicProfile = function (): ProductPublicProfile {
  return {
    id: this._id.toString(),
    name: this.name,
    description: this.description ?? null,
    brandId: this.brandId.toString(),
    tagIds: this.tagIds.map((t: mongoose.Types.ObjectId) => t.toString()),
    categoryId: this.categoryId.toString(),
    productPrices: this.productPrices.map((p: mongoose.Types.ObjectId) => p.toString()),
    sku: this.sku ?? null,
    stock: this.stock,
    isActive: this.isActive,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

// --- Export ---
export const Product =
  (mongoose.models.Product as IProductModel) ||
  mongoose.model<IProduct, IProductModel>('Product', ProductSchema);
