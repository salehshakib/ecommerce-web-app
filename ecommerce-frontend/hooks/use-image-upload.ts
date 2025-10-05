"use client";

import { useState } from "react";
import { uploadImage, deleteImage, validateImageFile, extractPublicIdFromUrl, ImageUploadResponse } from "@/utils/image-upload";

interface UseImageUploadOptions {
  maxSizeMB?: number;
  onSuccess?: (response: ImageUploadResponse) => void;
  onError?: (error: string) => void;
}

export const useImageUpload = (options: UseImageUploadOptions = {}) => {
  const { maxSizeMB = 10, onSuccess, onError } = options;

  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<ImageUploadResponse | null>(null);

  const upload = async (file: File): Promise<ImageUploadResponse | null> => {
    setError(null);

    // Validate file
    const validation = validateImageFile(file, maxSizeMB);
    if (!validation.isValid) {
      const errorMsg = validation.error || "Invalid file";
      setError(errorMsg);
      onError?.(errorMsg);
      return null;
    }

    setIsUploading(true);

    try {
      const response = await uploadImage(file);

      if (response.success) {
        setUploadedImage(response);
        onSuccess?.(response);
        return response;
      } else {
        const errorMsg = response.error || "Upload failed";
        setError(errorMsg);
        onError?.(errorMsg);
        return null;
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Upload failed";
      setError(errorMsg);
      onError?.(errorMsg);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const remove = async (url: string): Promise<boolean> => {
    const publicId = extractPublicIdFromUrl(url);
    if (!publicId) return false;

    try {
      const response = await deleteImage(publicId);
      return response.success;
    } catch (err) {
      console.error('Delete error:', err);
      return false;
    }
  };

  const reset = () => {
    setError(null);
    setUploadedImage(null);
    setIsUploading(false);
  };

  return {
    upload,
    remove,
    reset,
    isUploading,
    error,
    uploadedImage,
    // Helper function to get just the URL
    getImageUrl: () => uploadedImage?.url || null,
  };
};