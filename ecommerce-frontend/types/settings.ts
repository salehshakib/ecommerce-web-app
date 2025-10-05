export interface ISiteBranding {
  siteName: string;
  siteLogo?: string;
  siteFavicon?: string;
}

export interface ISeoConfig {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  openGhaphTitle?: string;
  openGraphDescription?: string;
  openGraphImage?: string;
}

export interface IBannerConfig {
  bannerImage?: string;
  bannerHeaderText?: string;
  bannerSubText?: string;
}

export interface IStoreLocation {
  storeName: string;
  storeAddress: string;
  latitude?: number;
  longitude?: number;
}

export interface IContactInfo {
  contactNumber: string;
  phoneNumber: string;
  emailAddress: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  tiktok?: string;
}

export interface INewsLetter {
  newsLetterEmail: string;
}

export interface IAboutUs {
  description: string;
  aboutUsImage?: string;
}

export interface UpcomingClass {
  title: string;
  image: string; // URL
  date: string; // ISO date string
  time: string; // HH:mm or similar
}

export interface Event {
  title: string;
  description?: string;
  images: [string, string]; // exactly 2 images
}

export interface Investor {
  title: string;
  description?: string;
  images: [string, string]; // exactly 2 images
}

export interface ISetting {
  siteBranding: ISiteBranding;
  seoConfig: ISeoConfig;
  bannerConfig: IBannerConfig;
  storeLocation: IStoreLocation;
  contactInfo: IContactInfo;
  newsLetter: INewsLetter;
  aboutUs: IAboutUs;
  upcomingClasses?: UpcomingClass[];
  event?: Event;
  investor?: Investor;
  _id: string;
  marqueeConfig: string[];
  __v: number;
}

export interface ISettingsResponse {
  message: string;
  settings: ISetting[];
}

// Type for updating settings (excludes _id and __v)
export interface IUpdateSettingsData {
  siteBranding: ISiteBranding;
  seoConfig: ISeoConfig;
  bannerConfig: IBannerConfig;
  storeLocation: IStoreLocation;
  contactInfo: IContactInfo;
  newsLetter: INewsLetter;
  aboutUs: IAboutUs;
  upcomingClasses?: UpcomingClass[];
  event?: Event;
  investor?: Investor;
  marqueeConfig: string[];
}
