"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import { uploadImage, validateImageFile, deleteImage, extractPublicIdFromUrl, ImageUploadResponse } from "@/utils/image-upload";

interface ServerImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  onRemove?: () => void;
  onUploadComplete?: (response: ImageUploadResponse) => void;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  maxSizeMB?: number;
}

export const ServerImageUpload: React.FC<ServerImageUploadProps> = ({
  value,
  onChange,
  onRemove,
  onUploadComplete,
  disabled = false,
  label = "Upload Image",
  placeholder = "Click to upload an image",
  maxSizeMB = 10,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    setError(null);

    // Validate file
    const validation = validateImageFile(file, maxSizeMB);
    if (!validation.isValid) {
      setError(validation.error || "Invalid file");
      return;
    }

    setIsUploading(true);

    try {
      const response = await uploadImage(file);

      if (response.success && response.url) {
        onChange(response.url);
        onUploadComplete?.(response);
      } else {
        setError(response.error || "Upload failed");
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
    // Reset input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemove = async () => {
    if (value && onRemove) {
      // Optionally delete from Cloudinary
      const publicId = extractPublicIdFromUrl(value);
      if (publicId) {
        try {
          await deleteImage(publicId);
        } catch (err) {
          console.error('Delete error:', err);
          // Continue with removal even if delete fails
        }
      }
      onRemove();
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled && !isUploading) {
      setIsDragOver(true);
    }
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

    if (disabled || isUploading) return;

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const openFileDialog = () => {
    if (!disabled && !isUploading && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="space-y-2">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
        disabled={disabled || isUploading}
      />

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
              onClick={handleRemove}
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
              disabled={disabled || isUploading}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      ) : (
        <>
          <div
            className={`relative w-full h-48 rounded-lg border-2 border-dashed transition-colors cursor-pointer ${
              disabled || isUploading
                ? "border-gray-200 bg-gray-50 cursor-not-allowed"
                : isDragOver
                ? "border-primary bg-primary/5"
                : "border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100"
            }`}
            onClick={openFileDialog}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
              {isUploading ? (
                <>
                  <Loader2 className="h-8 w-8 mb-2 animate-spin" />
                  <p className="text-sm font-medium">Uploading...</p>
                </>
              ) : (
                <>
                  <ImageIcon className="h-8 w-8 mb-2" />
                  <p className="text-sm font-medium">
                    {isDragOver ? "Drop your image here" : placeholder}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {isDragOver ? "Release to upload" : `PNG, JPG, GIF up to ${maxSizeMB}MB`}
                  </p>
                </>
              )}
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={openFileDialog}
            disabled={disabled || isUploading}
            className="w-full"
          >
            {isUploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                {label}
              </>
            )}
          </Button>
        </>
      )}

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md">
          {error}
        </div>
      )}
    </div>
  );
};