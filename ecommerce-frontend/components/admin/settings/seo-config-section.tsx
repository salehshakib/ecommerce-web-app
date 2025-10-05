"use client";

import { Control, Controller } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/image-upload";
import type { SettingsFormData } from "@/schemas/settings.schema";

interface SEOConfigSectionProps {
  control: Control<SettingsFormData>;
  register: any;
  errors: any;
}

export default function SEOConfigSection({
  control,
  register,
  errors,
}: SEOConfigSectionProps) {
  return (
    <Card className="border shadow-lg bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          SEO Configuration
        </CardTitle>
        <CardDescription>
          Configure search engine optimization settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="metaTitle" className="text-sm font-medium">
            Meta Title<span className="text-red-500">*</span>
          </Label>
          <Input
            id="metaTitle"
            {...register("seoConfig.metaTitle")}
            placeholder="Your Site Name - Luxury Perfumes & Fragrances"
            className={`border focus:border-primary shadow-none ${
              errors.seoConfig?.metaTitle
                ? "border-red-300"
                : "border-gray-300"
            }`}
          />
          {errors.seoConfig?.metaTitle && (
            <p className="text-xs text-red-600">
              {errors.seoConfig.metaTitle.message}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            Recommended length: 50-60 characters. This appears in browser
            tabs and search results.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="metaDescription" className="text-sm font-medium">
            Meta Description<span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="metaDescription"
            {...register("seoConfig.metaDescription")}
            placeholder="A brief description of your site (150-160 characters)"
            className={`min-h-[80px] resize-none border focus:border-primary shadow-none ${
              errors.seoConfig?.metaDescription
                ? "border-red-300"
                : "border-gray-300"
            }`}
          />
          {errors.seoConfig?.metaDescription && (
            <p className="text-xs text-red-600">
              {errors.seoConfig.metaDescription.message}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            Recommended length: 150-160 characters. This appears in search
            engine results.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="metaKeywords" className="text-sm font-medium">
            Meta Keywords
          </Label>
          <Controller
            name="seoConfig.metaKeywords"
            control={control}
            render={({ field }) => (
              <Input
                id="metaKeywords"
                value={
                  Array.isArray(field.value)
                    ? field.value.join(", ")
                    : field.value || ""
                }
                onChange={(e) => {
                  const keywords = e.target.value
                    .split(",")
                    .map((k) => k.trim())
                    .filter((k) => k);
                  field.onChange(keywords);
                }}
                placeholder="perfume, luxury, fragrance (comma separated)"
                className="border focus:border-primary shadow-none border-gray-300"
              />
            )}
          />
          <p className="text-xs text-muted-foreground">
            Enter keywords separated by commas. They will be converted to an
            array.
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="ogTitle" className="text-sm font-medium">
              Open Graph Title
            </Label>
            <Input
              id="ogTitle"
              {...register("seoConfig.openGhaphTitle")}
              placeholder="Title for social media sharing"
              className="border focus:border-primary shadow-none border-gray-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ogDescription" className="text-sm font-medium">
              Open Graph Description
            </Label>
            <Textarea
              id="ogDescription"
              {...register("seoConfig.openGraphDescription")}
              placeholder="Description for social media sharing"
              className="min-h-[80px] resize-none border focus:border-primary shadow-none border-gray-300"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Open Graph Image</Label>
          <Controller
            name="seoConfig.openGraphImage"
            control={control}
            render={({ field }) => (
              <ImageUpload
                value={field.value || ""}
                onChange={field.onChange}
                onRemove={() => field.onChange("")}
                label="Upload OG Image"
                placeholder="Click to upload image for social media sharing (1200x630)"
              />
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}