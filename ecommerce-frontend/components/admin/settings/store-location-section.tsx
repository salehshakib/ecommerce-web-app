"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";
import type { SettingsFormData } from "@/schemas/settings.schema";

interface StoreLocationSectionProps {
  register: any;
  errors: any;
}

export default function StoreLocationSection({
  register,
  errors,
}: StoreLocationSectionProps) {
  return (
    <Card className="border shadow-lg bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Store Location
        </CardTitle>
        <CardDescription>
          Configure your physical store location
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="storeName" className="text-sm font-medium">
              Store Name<span className="text-red-500">*</span>
            </Label>
            <Input
              id="storeName"
              {...register("storeLocation.storeName")}
              placeholder="Store name"
              className={`border focus:border-primary shadow-none ${
                errors.storeLocation?.storeName
                  ? "border-red-300"
                  : "border-gray-300"
              }`}
            />
            {errors.storeLocation?.storeName && (
              <p className="text-xs text-red-600">
                {errors.storeLocation.storeName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="storeAddress" className="text-sm font-medium">
              Address<span className="text-red-500">*</span>
            </Label>
            <Input
              id="storeAddress"
              {...register("storeLocation.storeAddress")}
              placeholder="Store address"
              className={`border focus:border-primary shadow-none ${
                errors.storeLocation?.storeAddress
                  ? "border-red-300"
                  : "border-gray-300"
              }`}
            />
            {errors.storeLocation?.storeAddress && (
              <p className="text-xs text-red-600">
                {errors.storeLocation.storeAddress.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="latitude" className="text-sm font-medium">
              Latitude
            </Label>
            <Input
              id="latitude"
              type="number"
              step="any"
              {...register("storeLocation.latitude", {
                valueAsNumber: true,
              })}
              placeholder="e.g., 40.7128"
              className="border focus:border-primary shadow-none border-gray-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="longitude" className="text-sm font-medium">
              Longitude
            </Label>
            <Input
              id="longitude"
              type="number"
              step="any"
              {...register("storeLocation.longitude", {
                valueAsNumber: true,
              })}
              placeholder="e.g., -74.0060"
              className="border focus:border-primary shadow-none border-gray-300"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}