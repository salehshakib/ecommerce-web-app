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

interface BannerConfigSectionProps {
  control: Control<SettingsFormData>;
  register: any;
  errors: any;
}

export default function BannerConfigSection({
  control,
  register,
  errors,
}: BannerConfigSectionProps) {
  return (
    <Card className="border shadow-lg bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Banner Configuration
        </CardTitle>
        <CardDescription>
          Configure your homepage banner content
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Banner Image</Label>
          <Controller
            name="bannerConfig.bannerImage"
            control={control}
            render={({ field }) => (
              <ImageUpload
                value={field.value || ""}
                onChange={field.onChange}
                onRemove={() => field.onChange("")}
                label="Upload Banner Image"
                placeholder="Click to upload banner image"
              />
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label
              htmlFor="bannerHeaderText"
              className="text-sm font-medium"
            >
              Banner Header Text
            </Label>
            <Input
              id="bannerHeaderText"
              {...register("bannerConfig.bannerHeaderText")}
              placeholder="Main banner headline"
              className="border focus:border-primary shadow-none border-gray-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bannerSubText" className="text-sm font-medium">
              Banner Sub Text
            </Label>
            <Input
              id="bannerSubText"
              {...register("bannerConfig.bannerSubText")}
              placeholder="Banner subtitle or description"
              className="border focus:border-primary shadow-none border-gray-300"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}