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
import { ImageUpload } from "@/components/ui/image-upload";
import type { SettingsFormData } from "@/schemas/settings.schema";

interface SiteBrandingSectionProps {
  control: Control<SettingsFormData>;
  register: any;
  errors: any;
}

export default function SiteBrandingSection({
  control,
  register,
  errors,
}: SiteBrandingSectionProps) {
  return (
    <Card className="border shadow-lg bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Site Branding
        </CardTitle>
        <CardDescription>
          Configure your site's basic branding elements
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="siteName" className="text-sm font-medium">
              Site Name<span className="text-red-500">*</span>
            </Label>
            <Input
              id="siteName"
              {...register("siteBranding.siteName")}
              placeholder="Your Site Name"
              className={`border focus:border-primary shadow-none ${
                errors.siteBranding?.siteName
                  ? "border-red-300"
                  : "border-gray-300"
              }`}
            />
            {errors.siteBranding?.siteName && (
              <p className="text-xs text-red-600">
                {errors.siteBranding.siteName.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Favicon</Label>
            <Controller
              name="siteBranding.siteFavicon"
              control={control}
              render={({ field }) => (
                <ImageUpload
                  value={field.value || ""}
                  onChange={field.onChange}
                  onRemove={() => field.onChange("")}
                  label="Upload Favicon"
                  placeholder="Click to upload favicon (16x16 or 32x32)"
                />
              )}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Logo</Label>
            <Controller
              name="siteBranding.siteLogo"
              control={control}
              render={({ field }) => (
                <ImageUpload
                  value={field.value || ""}
                  onChange={field.onChange}
                  onRemove={() => field.onChange("")}
                  label="Upload Logo"
                  placeholder="Click to upload site logo"
                />
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}