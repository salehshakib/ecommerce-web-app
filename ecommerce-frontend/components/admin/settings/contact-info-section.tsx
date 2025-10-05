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
import { Separator } from "@/components/ui/separator";
import {
  Phone,
  Facebook,
  Instagram,
  Music,
  Youtube,
} from "lucide-react";
import type { SettingsFormData } from "@/schemas/settings.schema";

interface ContactInfoSectionProps {
  register: any;
  errors: any;
}

export default function ContactInfoSection({
  register,
  errors,
}: ContactInfoSectionProps) {
  return (
    <Card className="border shadow-lg bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <Phone className="h-5 w-5" />
          Contact Information
        </CardTitle>
        <CardDescription>
          Configure your contact details and social media links
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="contactNumber" className="text-sm font-medium">
              Contact Number<span className="text-red-500">*</span>
            </Label>
            <Input
              id="contactNumber"
              {...register("contactInfo.contactNumber")}
              placeholder="Contact number"
              className={`border focus:border-primary shadow-none ${
                errors.contactInfo?.contactNumber
                  ? "border-red-300"
                  : "border-gray-300"
              }`}
            />
            {errors.contactInfo?.contactNumber && (
              <p className="text-xs text-red-600">
                {errors.contactInfo.contactNumber.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="text-sm font-medium">
              Phone Number<span className="text-red-500">*</span>
            </Label>
            <Input
              id="phoneNumber"
              {...register("contactInfo.phoneNumber")}
              placeholder="+1 (555) 123-4567"
              className={`border focus:border-primary shadow-none ${
                errors.contactInfo?.phoneNumber
                  ? "border-red-300"
                  : "border-gray-300"
              }`}
            />
            {errors.contactInfo?.phoneNumber && (
              <p className="text-xs text-red-600">
                {errors.contactInfo.phoneNumber.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="emailAddress" className="text-sm font-medium">
              Email Address<span className="text-red-500">*</span>
            </Label>
            <Input
              id="emailAddress"
              type="email"
              {...register("contactInfo.emailAddress")}
              placeholder="contact@example.com"
              className={`border focus:border-primary shadow-none ${
                errors.contactInfo?.emailAddress
                  ? "border-red-300"
                  : "border-gray-300"
              }`}
            />
            {errors.contactInfo?.emailAddress && (
              <p className="text-xs text-red-600">
                {errors.contactInfo.emailAddress.message}
              </p>
            )}
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h4 className="font-medium text-lg">Social Media Links</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="facebookLink"
                className="text-sm font-medium flex items-center gap-2"
              >
                <Facebook className="h-4 w-4" />
                Facebook Page
              </Label>
              <Input
                id="facebookLink"
                {...register("contactInfo.facebook")}
                placeholder="https://facebook.com/yourpage"
                className="border focus:border-primary shadow-none border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="instagramLink"
                className="text-sm font-medium flex items-center gap-2"
              >
                <Instagram className="h-4 w-4" />
                Instagram
              </Label>
              <Input
                id="instagramLink"
                {...register("contactInfo.instagram")}
                placeholder="https://instagram.com/youraccount"
                className="border focus:border-primary shadow-none border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="twitterLink"
                className="text-sm font-medium flex items-center gap-2"
              >
                <Music className="h-4 w-4" />
                Twitter
              </Label>
              <Input
                id="twitterLink"
                {...register("contactInfo.twitter")}
                placeholder="https://twitter.com/youraccount"
                className="border focus:border-primary shadow-none border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="youtubeLink"
                className="text-sm font-medium flex items-center gap-2"
              >
                <Youtube className="h-4 w-4" />
                YouTube
              </Label>
              <Input
                id="youtubeLink"
                {...register("contactInfo.youtube")}
                placeholder="https://youtube.com/yourchannel"
                className="border focus:border-primary shadow-none border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="linkedinLink"
                className="text-sm font-medium flex items-center gap-2"
              >
                <Music className="h-4 w-4" />
                LinkedIn
              </Label>
              <Input
                id="linkedinLink"
                {...register("contactInfo.linkedin")}
                placeholder="https://linkedin.com/company/yourcompany"
                className="border focus:border-primary shadow-none border-gray-300"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}