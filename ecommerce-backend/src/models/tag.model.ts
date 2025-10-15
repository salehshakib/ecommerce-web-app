// tag.model.ts
import mongoose, { Model, Schema } from 'mongoose';

import type { ITag, TagPublicProfile } from '@/types/tag.types';

export interface ITagModel extends Model<ITag> {}

const TagSchema = new Schema<ITag, ITagModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxlength: 50,
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
TagSchema.index({ name: 1 });
TagSchema.index({ isActive: 1 });
TagSchema.index({ createdAt: -1 });

// Pre-validation cleanup
TagSchema.pre('validate', function () {
  if (this.name) this.name = this.name.trim();
  if (this.description === '') this.description = null as any;
});

// Instance method
TagSchema.methods.getPublicProfile = function (): TagPublicProfile {
  return {
    id: this._id.toString(),
    name: this.name,
    description: this.description ?? null,
    isActive: this.isActive,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

export const Tag =
  (mongoose.models.Tag as ITagModel) || mongoose.model<ITag, ITagModel>('Tag', TagSchema);
