import mongoose, { Document, Model, Schema } from 'mongoose';

import type { ISettings, SettingsPublicProfile } from '@/types/settings.type';

export interface ISettingsModel extends Model<ISettings> {}

const SettingsSchema = new Schema<ISettings, ISettingsModel>(
  {
    siteBranding: {
      siteName: { type: String, required: true, trim: true },
      siteLogo: { type: String, trim: true, default: null },
      siteFavicon: { type: String, trim: true, default: null },
    },
    seoConfig: {
      metaTitle: { type: String, required: true, trim: true },
      metaDescription: { type: String, required: true, trim: true },
      metaKeywords: { type: [String], default: [] },
      openGhaphTitle: { type: String, trim: true, default: null },
      openGraphDescription: { type: String, trim: true, default: null },
      openGraphImage: { type: String, trim: true, default: null },
    },
    bannerConfig: {
      bannerImage: { type: String, trim: true, default: null },
      bannerHeaderText: { type: String, trim: true, default: null },
      bannerSubText: { type: String, trim: true, default: null },
    },
    marqueeConfig: {
      marqueeText: { type: [String], default: [] },
    },
    storeLocation: {
      storeName: { type: String, required: true, trim: true },
      storeAddress: { type: String, required: true, trim: true },
      latitude: { type: Number, default: null },
      longitude: { type: Number, default: null },
    },
    contactInfo: {
      contactNumber: { type: String, trim: true, default: null },
      phoneNumber: { type: String, trim: true, default: null },
      emailAddress: { type: String, trim: true, default: null },
      facebook: { type: String, trim: true, default: null },
      instagram: { type: String, trim: true, default: null },
      youtube: { type: String, trim: true, default: null },
      tiktok: { type: String, trim: true, default: null },
    },
    newsLetter: {
      newsLetterEmail: { type: String, trim: true, default: null },
    },
    aboutUs: {
      description: { type: String, trim: true, default: null },
      aboutUsImage: { type: String, trim: true, default: null },
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
SettingsSchema.methods.getPublicProfile = function (): SettingsPublicProfile {
  return {
    siteBranding: this.siteBranding,
    seoConfig: this.seoConfig,
    bannerConfig: this.bannerConfig,
    marqueeConfig: this.marqueeConfig,
    storeLocation: this.storeLocation,
    contactInfo: this.contactInfo,
    newsLetter: this.newsLetter,
    aboutUs: this.aboutUs,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

export const Settings =
  (mongoose.models.Settings as ISettingsModel) ||
  mongoose.model<ISettings, ISettingsModel>('Settings', SettingsSchema);
