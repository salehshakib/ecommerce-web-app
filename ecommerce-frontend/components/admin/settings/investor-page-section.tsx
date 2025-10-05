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
import { TrendingUp } from "lucide-react";
import type { SettingsFormData } from "@/schemas/settings.schema";

interface InvestorPageSectionProps {
  control: Control<SettingsFormData>;
  register: any;
  errors: any;
}

export default function InvestorPageSection({
  control,
  register,
  errors,
}: InvestorPageSectionProps) {
  return (
    <Card className="border shadow-lg bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Investor Page Configuration
        </CardTitle>
        <CardDescription>
          Configure the content and images for your investor relations page
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="investorTitle" className="text-sm font-medium">
            Investor Page Title<span className="text-red-500">*</span>
          </Label>
          <Input
            id="investorTitle"
            {...register("investor.title")}
            placeholder="e.g., Investor Relations"
            className={`border focus:border-primary shadow-none ${
              errors.investor?.title ? "border-red-300" : "border-gray-300"
            }`}
          />
          {errors.investor?.title && (
            <p className="text-xs text-red-600">
              {errors.investor.title.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="investorPageDescription"
            className="text-sm font-medium"
          >
            Investor Page Description
          </Label>
          <Textarea
            id="investorPageDescription"
            {...register("investor.description")}
            placeholder="Describe your investor relations content (optional)"
            className="min-h-[80px] resize-none border focus:border-primary shadow-none border-gray-300"
          />
          <p className="text-xs text-muted-foreground">
            Optional description that will appear on your investor relations
            page
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-lg">Investor Page Images</h4>
          <p className="text-sm text-muted-foreground">
            Upload exactly 2 images for your investor relations page. Both
            images are required.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Investor Image 1<span className="text-red-500">*</span>
              </Label>
              <Controller
                name="investor.images.0"
                control={control}
                render={({ field }) => (
                  <ImageUpload
                    value={field.value || ""}
                    onChange={field.onChange}
                    onRemove={() => field.onChange("")}
                    label="Upload First Investor Image"
                    placeholder="Click to upload first investor image"
                  />
                )}
              />
              {errors.investor?.images?.[0] && (
                <p className="text-xs text-red-600">
                  {errors.investor.images[0].message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Investor Image 2<span className="text-red-500">*</span>
              </Label>
              <Controller
                name="investor.images.1"
                control={control}
                render={({ field }) => (
                  <ImageUpload
                    value={field.value || ""}
                    onChange={field.onChange}
                    onRemove={() => field.onChange("")}
                    label="Upload Second Investor Image"
                    placeholder="Click to upload second investor image"
                  />
                )}
              />
              {errors.investor?.images?.[1] && (
                <p className="text-xs text-red-600">
                  {errors.investor.images[1].message}
                </p>
              )}
            </div>
          </div>

          {errors.investor?.images &&
            !errors.investor.images[0] &&
            !errors.investor.images[1] && (
              <p className="text-xs text-red-600">
                {errors.investor.images.message}
              </p>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
