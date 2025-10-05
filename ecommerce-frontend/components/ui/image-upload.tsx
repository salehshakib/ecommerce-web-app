"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  onRemove?: () => void;
  onUploadComplete?: (result: any) => void;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
}

const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onRemove,
  onUploadComplete,
  disabled = false,
  label = "Upload Image",
  placeholder = "Click to upload an image",
}) => {
  const [resource, setResource] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleUploadSuccess = (result: any) => {
    console.log("Upload success:", result);
    setResource(result?.info);
    onChange(result?.info?.secure_url);
    onUploadComplete?.(result?.info);
    setIsUploading(false);
  };

  const handleUploadError = (error: any) => {
    console.error("Upload error:", error);
    setIsUploading(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    // The actual file upload will be handled by the Cloudinary widget
    // This just provides visual feedback
  };

  return (
    <div className="space-y-2">
      <CldUploadWidget
        uploadPreset={uploadPreset}
        options={{
          multiple: false,
          resourceType: "image",
          maxImageWidth: 2000,
          maxImageHeight: 2000,
          sources: ["local", "url", "camera"],
          cropping: true,
          croppingAspectRatio: 1,
          croppingValidateDimensions: true,
          showAdvancedOptions: false,
          defaultSource: "local",
          styles: {
            palette: {
              window: "#FFFFFF",
              windowBorder: "#90A0B3",
              tabIcon: "#0078FF",
              menuIcons: "#5A616A",
              textDark: "#000000",
              textLight: "#FFFFFF",
              link: "#0078FF",
              action: "#FF620C",
              inactiveTabIcon: "#0E2F5A",
              error: "#F44235",
              inProgress: "#0078FF",
              complete: "#20B832",
              sourceBg: "#E4EBF1",
            },
          },
        }}
        onSuccess={handleUploadSuccess}
        onError={handleUploadError}
        onOpen={() => {
          console.log("Cloudinary widget opened successfully");
          setIsUploading(true);
        }}
        onClose={() => {
          console.log("Cloudinary widget closed");
          setIsUploading(false);
        }}
      >
        {({ open }) => (
          <>
            {value ? (
              <div className="relative">
                <div className="relative w-full h-48 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden">
                  <Image
                    src={value}
                    alt="Uploaded image"
                    fill
                    className="object-contain"
                  />
                </div>
                {onRemove && (
                  <Button
                    type="button"
                    onClick={onRemove}
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    disabled={disabled}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
                {/* Replace/Change Image Button */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    console.log(
                      "Replace image button clicked, opening widget..."
                    );
                    open();
                  }}
                  disabled={disabled || isUploading}
                  className="w-full mt-2"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {isUploading ? "Uploading..." : "Replace Image"}
                </Button>
              </div>
            ) : (
              <>
                <div
                  className={`relative w-full h-48 rounded-lg border-2 border-dashed transition-colors cursor-pointer ${
                    isDragOver
                      ? "border-primary bg-primary/5"
                      : "border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    console.log("Upload area clicked, opening widget...");
                    open();
                  }}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 hover:text-gray-600">
                    <ImageIcon className="h-8 w-8 mb-2" />
                    <p className="text-sm font-medium">
                      {isUploading
                        ? "Uploading..."
                        : isDragOver
                        ? "Drop your image here"
                        : placeholder}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {isDragOver
                        ? "Release to upload"
                        : "PNG, JPG, GIF up to 10MB"}
                    </p>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    console.log("Upload button clicked, opening widget...");
                    open();
                  }}
                  disabled={disabled || isUploading}
                  className="w-full"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {isUploading ? "Uploading..." : label}
                </Button>
              </>
            )}
          </>
        )}
      </CldUploadWidget>
    </div>
  );
};
