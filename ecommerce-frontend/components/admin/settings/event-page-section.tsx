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
import { Calendar } from "lucide-react";
import type { SettingsFormData } from "@/schemas/settings.schema";

interface EventPageSectionProps {
  control: Control<SettingsFormData>;
  register: any;
  errors: any;
}

export default function EventPageSection({
  control,
  register,
  errors,
}: EventPageSectionProps) {
  return (
    <Card className="border shadow-lg bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Event Page Configuration
        </CardTitle>
        <CardDescription>
          Configure the content and images for your events page
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="eventTitle" className="text-sm font-medium">
            Event Page Title<span className="text-red-500">*</span>
          </Label>
          <Input
            id="eventTitle"
            {...register("event.title")}
            placeholder="e.g., Our Exclusive Events"
            className={`border focus:border-primary shadow-none ${
              errors.event?.title ? "border-red-300" : "border-gray-300"
            }`}
          />
          {errors.event?.title && (
            <p className="text-xs text-red-600">{errors.event.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="eventPageDescription" className="text-sm font-medium">
            Event Page Description
          </Label>
          <Textarea
            id="eventPageDescription"
            {...register("event.description")}
            placeholder="Describe your events page content (optional)"
            className="min-h-[80px] resize-none border focus:border-primary shadow-none border-gray-300"
          />
          <p className="text-xs text-muted-foreground">
            Optional description that will appear on your events page
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-lg">Event Page Images</h4>
          <p className="text-sm text-muted-foreground">
            Upload exactly 2 images for your events page. Both images are
            required.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Event Image 1<span className="text-red-500">*</span>
              </Label>
              <Controller
                name="event.images.0"
                control={control}
                render={({ field }) => (
                  <ImageUpload
                    value={field.value || ""}
                    onChange={field.onChange}
                    onRemove={() => field.onChange("")}
                    label="Upload First Event Image"
                    placeholder="Click to upload first event image"
                  />
                )}
              />
              {errors.event?.images?.[0] && (
                <p className="text-xs text-red-600">
                  {errors.event.images[0].message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Event Image 2<span className="text-red-500">*</span>
              </Label>
              <Controller
                name="event.images.1"
                control={control}
                render={({ field }) => (
                  <ImageUpload
                    value={field.value || ""}
                    onChange={field.onChange}
                    onRemove={() => field.onChange("")}
                    label="Upload Second Event Image"
                    placeholder="Click to upload second event image"
                  />
                )}
              />
              {errors.event?.images?.[1] && (
                <p className="text-xs text-red-600">
                  {errors.event.images[1].message}
                </p>
              )}
            </div>
          </div>

          {errors.event?.images &&
            !errors.event.images[0] &&
            !errors.event.images[1] && (
              <p className="text-xs text-red-600">
                {errors.event.images.message}
              </p>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
