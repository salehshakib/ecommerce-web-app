"use client";

import { useState } from "react";
import { Control, Controller, useFieldArray } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/ui/image-upload";
import { Plus, Trash2, GraduationCap } from "lucide-react";
import type { SettingsFormData } from "@/schemas/settings.schema";

interface UpcomingClassesSectionProps {
  control: Control<SettingsFormData>;
  register: any;
  errors: any;
}

export default function UpcomingClassesSection({
  control,
  register,
  errors,
}: UpcomingClassesSectionProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "upcomingClasses",
  });

  const addUpcomingClass = () => {
    append({
      title: "",
      image: "",
      date: "",
      time: "",
    });
  };

  const removeUpcomingClass = (index: number) => {
    remove(index);
  };

  return (
    <Card className="border shadow-lg bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <GraduationCap className="h-5 w-5" />
          Upcoming Classes
        </CardTitle>
        <CardDescription>
          Manage the upcoming classes displayed on your website
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {fields.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <GraduationCap className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium">No upcoming classes configured</p>
            <p className="text-sm">Add your first upcoming class to get started</p>
          </div>
        ) : (
          <div className="space-y-6">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="p-6 border border-gray-200 rounded-lg space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-lg">
                    Upcoming Class {index + 1}
                  </h4>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeUpcomingClass(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor={`upcomingClasses.${index}.title`}
                      className="text-sm font-medium"
                    >
                      Class Title<span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id={`upcomingClasses.${index}.title`}
                      {...register(`upcomingClasses.${index}.title`)}
                      placeholder="e.g., Perfume Making Workshop"
                      className={`border focus:border-primary shadow-none ${
                        errors.upcomingClasses?.[index]?.title
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.upcomingClasses?.[index]?.title && (
                      <p className="text-xs text-red-600">
                        {errors.upcomingClasses[index].title.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Class Image<span className="text-red-500">*</span>
                    </Label>
                    <Controller
                      name={`upcomingClasses.${index}.image`}
                      control={control}
                      render={({ field }) => (
                        <ImageUpload
                          value={field.value || ""}
                          onChange={field.onChange}
                          onRemove={() => field.onChange("")}
                          label="Upload Class Image"
                          placeholder="Click to upload class image"
                        />
                      )}
                    />
                    {errors.upcomingClasses?.[index]?.image && (
                      <p className="text-xs text-red-600">
                        {errors.upcomingClasses[index].image.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor={`upcomingClasses.${index}.date`}
                      className="text-sm font-medium"
                    >
                      Date<span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id={`upcomingClasses.${index}.date`}
                      type="date"
                      {...register(`upcomingClasses.${index}.date`)}
                      className={`border focus:border-primary shadow-none ${
                        errors.upcomingClasses?.[index]?.date
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.upcomingClasses?.[index]?.date && (
                      <p className="text-xs text-red-600">
                        {errors.upcomingClasses[index].date.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor={`upcomingClasses.${index}.time`}
                      className="text-sm font-medium"
                    >
                      Time<span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id={`upcomingClasses.${index}.time`}
                      type="time"
                      {...register(`upcomingClasses.${index}.time`)}
                      className={`border focus:border-primary shadow-none ${
                        errors.upcomingClasses?.[index]?.time
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.upcomingClasses?.[index]?.time && (
                      <p className="text-xs text-red-600">
                        {errors.upcomingClasses[index].time.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <Button
          type="button"
          variant="outline"
          onClick={addUpcomingClass}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Upcoming Class
        </Button>
      </CardContent>
    </Card>
  );
}