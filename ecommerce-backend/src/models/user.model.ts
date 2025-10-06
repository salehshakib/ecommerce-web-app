import argon2 from 'argon2';
import mongoose, { Schema } from 'mongoose';

import type { UserPublicProfile, UserRole, UserStatus } from '@/types/user.type.js';
import type { Document, Model } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  passwordHash: string;
  role: UserRole;
  status: UserStatus;
  emailVerifiedAt?: Date | null;
  profileImage?: string | null;
  createdAt: Date;
  updatedAt: Date;

  setPassword(plain: string): Promise<void>;
  verifyPassword(plain: string): Promise<boolean>;
  getPublicProfile(): UserPublicProfile;
}

export interface IUserModel extends Model<IUser> {}

const UserSchema = new Schema<IUser, IUserModel>(
  {
    firstName: { type: String, required: true, trim: true, maxlength: 50 },
    lastName: { type: String, required: true, trim: true, maxlength: 50 },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      index: true,
      maxlength: 254,
    },
    phone: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
      maxlength: 20,
    },
    passwordHash: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ['user', 'admin', 'owner'],
      default: 'user',
      index: true,
    },
    status: {
      type: String,
      enum: ['active', 'pending', 'disabled'],
      default: 'active',
      index: true,
    },
    emailVerifiedAt: { type: Date, default: null },
    profileImage: { type: String, trim: true, default: null },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret: any) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.passwordHash;
        return ret;
      },
    },
    toObject: { virtuals: true },
  },
);

// Indexes
UserSchema.index({ role: 1, status: 1 });
UserSchema.index({ createdAt: -1 });

// Instance methods
UserSchema.methods.setPassword = async function (plain: string): Promise<void> {
  this.passwordHash = await argon2.hash(plain, { type: argon2.argon2id });
};

UserSchema.methods.verifyPassword = function (plain: string): Promise<boolean> {
  return argon2.verify(this.passwordHash, plain);
};

UserSchema.methods.getPublicProfile = function () {
  return {
    id: this._id.toString(),
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    phone: this.phone ?? null,
    role: this.role,
    status: this.status,
    emailVerifiedAt: this.emailVerifiedAt ?? null,
    profileImage: this.profileImage ?? null,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

// Pre-validate hook
UserSchema.pre('validate', function () {
  if (this.email) this.email = this.email.toLowerCase().trim();
  if (this.firstName) this.firstName = this.firstName.trim();
  if (this.lastName) this.lastName = this.lastName.trim();
  if (this.phone === '') this.phone = null as any;
  if (this.profileImage === '') this.profileImage = null as any;
});

export const User =
  (mongoose.models.User as IUserModel) || mongoose.model<IUser, IUserModel>('User', UserSchema);
