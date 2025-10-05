import type { Metadata } from "next";
import type { ISeoConfig } from "@/types/settings";

interface SEOOptions {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
}

export function generateMetadata(
  seoConfig: ISeoConfig | null,
  options: SEOOptions = {}
): Metadata {
  if (!seoConfig) {
    return {
      title: "",
      description:
        options.description ||
        "Discover our exclusive collection of luxury fragrances",
    };
  }

  const title = options.title
    ? `${options.title} | ${seoConfig.metaTitle}`
    : seoConfig.metaTitle;

  const description = options.description || seoConfig.metaDescription;
  const keywords = options.keywords?.length
    ? [...seoConfig.metaKeywords, ...options.keywords]
    : seoConfig.metaKeywords;

  const ogTitle = seoConfig.openGhaphTitle || seoConfig.metaTitle;
  const ogDescription = seoConfig.openGraphDescription || description;
  const ogImage = options.image || seoConfig.openGraphImage;

  return {
    title,
    description,
    keywords: keywords.join(", "),
    openGraph: {
      title: options.title ? `${options.title} | ${ogTitle}` : ogTitle,
      description: ogDescription,
      siteName: seoConfig.metaTitle,
      ...(ogImage && { images: [{ url: ogImage, alt: ogTitle }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: options.title ? `${options.title} | ${ogTitle}` : ogTitle,
      description: ogDescription,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}
