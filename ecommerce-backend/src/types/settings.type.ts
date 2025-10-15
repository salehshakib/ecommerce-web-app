import { Document } from 'mongoose';

export interface SiteBranding {
  siteName: string;
  siteLogo?: string | null;
  siteFavicon?: string | null;
}

export interface SeoConfig {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  openGhaphTitle?: string | null;
  openGraphDescription?: string | null;
  openGraphImage?: string | null;
}

export interface BannerConfig {
  bannerImage?: string | null;
  bannerHeaderText?: string | null;
  bannerSubText?: string | null;
}

export interface MarqueeConfig {
  marqueeText: string[];
}

export interface StoreLocation {
  storeName: string;
  storeAddress: string;
  latitude?: number | null;
  longitude?: number | null;
}

export interface ContactInfo {
  contactNumber?: string | null;
  phoneNumber?: string | null;
  emailAddress?: string | null;
  facebook?: string | null;
  instagram?: string | null;
  youtube?: string | null;
  tiktok?: string | null;
}

export interface NewsLetter {
  newsLetterEmail?: string | null;
}

export interface AboutUs {
  description?: string | null;
  aboutUsImage?: string | null;
}

export interface SettingsPublicProfile {
  siteBranding: SiteBranding;
  seoConfig: SeoConfig;
  bannerConfig: BannerConfig;
  marqueeConfig: MarqueeConfig;
  storeLocation: StoreLocation;
  contactInfo: ContactInfo;
  newsLetter: NewsLetter;
  aboutUs: AboutUs;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISettings extends SettingsPublicProfile, Document {
  getPublicProfile(): SettingsPublicProfile;
}
