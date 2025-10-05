"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useUpdateSettingsMutation } from "@/hooks/mutations/use-settings-mutations";
import { useSettingsQuery } from "@/hooks/queries/use-settings-query";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import AboutUsSection from "@/components/admin/settings/about-us-section";
import BannerConfigSection from "@/components/admin/settings/banner-config-section";
import ContactInfoSection from "@/components/admin/settings/contact-info-section";
import EventPageSection from "@/components/admin/settings/event-page-section";
import InvestorPageSection from "@/components/admin/settings/investor-page-section";
import MarqueeConfigSection from "@/components/admin/settings/marquee-config-section";
import NewsletterSection from "@/components/admin/settings/newsletter-section";
import SEOConfigSection from "@/components/admin/settings/seo-config-section";
import SiteBrandingSection from "@/components/admin/settings/site-branding-section";
import StoreLocationSection from "@/components/admin/settings/store-location-section";
import UpcomingClassesSection from "@/components/admin/settings/upcoming-classes-section";
import {
  settingsFormSchema,
  type SettingsFormData,
} from "@/schemas/settings.schema";

export default function SettingsPage() {
  const { data: settings, isLoading, error } = useSettingsQuery();
  const updateSettingsMutation = useUpdateSettingsMutation();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      siteBranding: {
        siteName: "",
        siteLogo: "",
        siteFavicon: "",
      },
      seoConfig: {
        metaTitle: "",
        metaDescription: "",
        metaKeywords: [],
        openGhaphTitle: "",
        openGraphDescription: "",
        openGraphImage: "",
      },
      bannerConfig: {
        bannerImage: "",
        bannerHeaderText: "",
        bannerSubText: "",
      },
      storeLocation: {
        storeName: "",
        storeAddress: "",
        latitude: undefined,
        longitude: undefined,
      },
      contactInfo: {
        contactNumber: "",
        phoneNumber: "",
        emailAddress: "",
        facebook: "",
        instagram: "",
        twitter: "",
        youtube: "",
        linkedin: "",
      },
      newsLetter: {
        newsLetterEmail: "",
      },
      aboutUs: {
        description: "",
        aboutUsImage: "",
      },
      marqueeConfig: [""],
      upcomingClasses: [],
      event: {
        title: "",
        description: "",
        images: ["", ""],
      },
      investor: {
        title: "",
        description: "",
        images: ["", ""],
      },
    },
  });

  // Manual marquee config state for simplified handling
  const [marqueeTexts, setMarqueeTexts] = useState<string[]>([""]);

  // Populate form when settings data loads
  useEffect(() => {
    if (settings) {
      reset({
        siteBranding: settings.siteBranding,
        seoConfig: settings.seoConfig,
        bannerConfig: settings.bannerConfig,
        storeLocation: settings.storeLocation,
        contactInfo: settings.contactInfo,
        newsLetter: settings.newsLetter,
        aboutUs: settings.aboutUs,
        marqueeConfig: settings.marqueeConfig,
        upcomingClasses: settings.upcomingClasses || [],
        event: settings.event || {
          title: "",
          description: "",
          images: ["", ""],
        },
        investor: settings.investor || {
          title: "",
          description: "",
          images: ["", ""],
        },
      });
      setMarqueeTexts(settings.marqueeConfig || [""]);
    }
  }, [settings, reset]);

  const onSubmit = async (data: SettingsFormData) => {
    try {
      const formData = {
        ...data,
        marqueeConfig: marqueeTexts.filter((text) => text.trim() !== ""),
      };

      await updateSettingsMutation.mutateAsync(formData);
      toast({
        title: "Success",
        description: "Settings updated successfully!",
        variant: "default",
      });
    } catch (error) {
      console.error("Error updating settings:", error);
      toast({
        title: "Error",
        description: "Failed to update settings. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 px-4 sm:px-0 max-w-6xl mx-auto">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-3 text-muted-foreground">
            Loading settings...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-4 sm:px-0 max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/admin">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Settings</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Site Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your website configuration and content
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Site Branding Section */}
        <SiteBrandingSection
          control={control}
          register={register}
          errors={errors}
        />

        {/* SEO Section */}
        <SEOConfigSection
          control={control}
          register={register}
          errors={errors}
        />

        {/* Banner Section */}
        <BannerConfigSection
          control={control}
          register={register}
          errors={errors}
        />

        {/* Marquee Section */}
        <MarqueeConfigSection
          marqueeTexts={marqueeTexts}
          setMarqueeTexts={setMarqueeTexts}
        />

        {/* Store Location Section */}
        <StoreLocationSection register={register} errors={errors} />

        {/* Contact Section */}
        <ContactInfoSection register={register} errors={errors} />

        {/* Newsletter & Email Section */}
        <NewsletterSection register={register} errors={errors} />

        {/* About Us Section */}
        <AboutUsSection control={control} register={register} errors={errors} />

        {/* Upcoming Classes Section */}
        <UpcomingClassesSection
          control={control}
          register={register}
          errors={errors}
        />

        {/* Event Page Section */}
        <EventPageSection
          control={control}
          register={register}
          errors={errors}
        />

        {/* Investor Page Section */}
        <InvestorPageSection
          control={control}
          register={register}
          errors={errors}
        />

        {/* Submit Button */}
        <div className="flex justify-end pb-6">
          <Button
            type="submit"
            className="px-8 bg-primary hover:bg-primary/90"
            disabled={updateSettingsMutation.isPending}
          >
            {updateSettingsMutation.isPending ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Updating...
              </>
            ) : (
              "Update Settings"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
