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
import { Mail } from "lucide-react";
import type { SettingsFormData } from "@/schemas/settings.schema";

interface NewsletterSectionProps {
  register: any;
  errors: any;
}

export default function NewsletterSection({
  register,
  errors,
}: NewsletterSectionProps) {
  return (
    <Card className="border shadow-lg bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Newsletter & Email Setup
        </CardTitle>
        <CardDescription>
          Configure email settings for newsletters and notifications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="newsletterEmail" className="text-sm font-medium">
            Newsletter Email<span className="text-red-500">*</span>
          </Label>
          <Input
            id="newsletterEmail"
            type="email"
            {...register("newsLetter.newsLetterEmail")}
            placeholder="newsletter@example.com"
            className={`border focus:border-primary shadow-none ${
              errors.newsLetter?.newsLetterEmail
                ? "border-red-300"
                : "border-gray-300"
            }`}
          />
          {errors.newsLetter?.newsLetterEmail && (
            <p className="text-xs text-red-600">
              {errors.newsLetter.newsLetterEmail.message}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            This email will be used for sending newsletters and automated
            emails
          </p>
        </div>
      </CardContent>
    </Card>
  );
}