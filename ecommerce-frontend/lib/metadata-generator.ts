import { settingsApi } from "@/lib/api/endpoints/settings.api";
import { createPublicFetch } from "@/lib/api/utils/public-fetch";
import { generateMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import type { ISettingsResponse } from "@/types/settings";

const getSettings = async (): Promise<ISettingsResponse> => {
  return createPublicFetch(settingsApi.GET_SETTINGS);
};

export async function generatePageMetadata(options?: {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
}): Promise<Metadata> {
  try {
    const settingsData = await getSettings();
    const settings = settingsData.settings && settingsData.settings.length > 0
      ? settingsData.settings[0]
      : null;
    const seoConfig = settings?.seoConfig || null;

    const baseMetadata = generateMetadata(seoConfig, options);

    // Add favicon from siteBranding if available
    if (settings?.siteBranding?.siteFavicon) {
      return {
        ...baseMetadata,
        icons: {
          icon: settings.siteBranding.siteFavicon,
          shortcut: settings.siteBranding.siteFavicon,
          apple: settings.siteBranding.siteFavicon,
        },
      };
    }

    return baseMetadata;
  } catch (error) {
    // Fallback metadata if settings fetch fails
    return generateMetadata(null, options);
  }
}