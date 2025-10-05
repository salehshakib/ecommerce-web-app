"use client";

import { Control, Controller } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/image-upload";
import type { SettingsFormData } from "@/schemas/settings.schema";

interface AboutUsSectionProps {
  control: Control<SettingsFormData>;
  register: any;
  errors: any;
}

export default function AboutUsSection({
  control,
  register,
  errors,
}: AboutUsSectionProps) {
  return (
    <Card className="border shadow-lg bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">About Us</CardTitle>
        <CardDescription>
          Configure your about us section content
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label
            htmlFor="aboutUsDescription"
            className="text-sm font-medium"
          >
            Description<span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="aboutUsDescription"
            {...register("aboutUs.description")}
            placeholder="Write about your company, mission, and values"
            className={`min-h-[120px] resize-none border focus:border-primary shadow-none ${
              errors.aboutUs?.description
                ? "border-red-300"
                : "border-gray-300"
            }`}
          />
          {errors.aboutUs?.description && (
            <p className="text-xs text-red-600">
              {errors.aboutUs.description.message}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            Minimum 10 characters. This will appear on your about us page.
          </p>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">About Us Image</Label>
          <Controller
            name="aboutUs.aboutUsImage"
            control={control}
            render={({ field }) => (
              <ImageUpload
                value={field.value || ""}
                onChange={field.onChange}
                onRemove={() => field.onChange("")}
                label="Upload About Us Image"
                placeholder="Click to upload image for about us section"
              />
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}