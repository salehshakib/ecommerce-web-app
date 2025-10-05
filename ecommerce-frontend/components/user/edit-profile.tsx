"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageUpload } from "@/components/ui/image-upload";
import { updateUserProfile } from "@/hooks/mutations/use-profile-mutations";
import { ProfileResponse, UpdateProfileData } from "@/types/auth";
import { baseUrl } from "@/lib/api/endpoints/base-url";
import { profileApi } from "@/lib/api/endpoints/user.api";
import { getStoredToken } from "@/utils/auth";
import { LoadingSpinner } from "@/components/ui/loading";

interface EditProfileProps {
  profile: ProfileResponse;
  onProfileUpdate: (profile: ProfileResponse) => void;
  onCancel: () => void;
}

export const EditProfile: React.FC<EditProfileProps> = ({
  profile,
  onProfileUpdate,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    userName: profile?.userName || "",
    email: profile?.email || "",
    avatar: profile?.avatar || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      avatar: value,
    }));
  };

  const handleAvatarUploadComplete = async (result: any) => {
    // When avatar upload completes, send the full URL to UPDATE_AVATAR endpoint
    if (result?.secure_url) {
      try {
        const token = getStoredToken();
        if (!token) {
          throw new Error("No authentication token found");
        }

        // Use the secure_url from Cloudinary result
        const avatarUrl = result.secure_url;

        // Update avatar in database using the full URL
        const response = await fetch(`${baseUrl}${profileApi.UPDATE_AVATAR}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            avatar: avatarUrl, // Send full URL to database
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to update avatar: ${response.statusText}`);
        }

        console.log("Avatar updated in database with URL:", avatarUrl);
      } catch (err) {
        console.error("Avatar update error:", err);
        setError(
          err instanceof Error ? err.message : "Failed to update avatar"
        );
      }
    }
  };

  const handleAvatarRemove = async () => {
    try {
      const token = getStoredToken();
      if (!token) {
        throw new Error("No authentication token found");
      }

      // Delete avatar from database
      const response = await fetch(`${baseUrl}${profileApi.DELETE_AVATAR}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete avatar: ${response.statusText}`);
      }

      setFormData((prev) => ({
        ...prev,
        avatar: "",
      }));

      console.log("Avatar removed from database");
    } catch (err) {
      console.error("Avatar removal error:", err);
      setError(err instanceof Error ? err.message : "Failed to remove avatar");
    }
  };

  const handleCancel = () => {
    // Reset form data to original profile data
    setFormData({
      userName: profile.userName || "",
      email: profile.email || "",
      avatar: profile.avatar || "",
    });
    setError("");
    onCancel();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Prepare profile data (excluding avatar since it's handled separately)
      const profileData: UpdateProfileData = {
        userName: formData.userName,
        email: formData.email,
      };

      // Only include avatar if it's different from current
      if (formData.avatar !== profile.avatar) {
        profileData.avatar = formData.avatar;
      }

      const updatedProfile = await updateUserProfile(profileData);
      onProfileUpdate(updatedProfile);
      console.log("Profile updated successfully:", updatedProfile);
    } catch (err) {
      console.error("Failed to update profile:", err);
      setError(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Profile Picture
          </label>
          <ImageUpload
            value={formData.avatar}
            onChange={handleAvatarChange}
            onRemove={handleAvatarRemove}
            onUploadComplete={handleAvatarUploadComplete}
            label="Upload Avatar"
            placeholder="Click to upload your profile picture"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <Input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-none focus:outline-none focus:border-primary"
            placeholder="Enter username"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-none focus:outline-none focus:border-primary"
            placeholder="Enter email"
            required
            disabled={loading}
          />
        </div>

        <div className="pt-4 flex gap-4">
          <Button
            type="submit"
            disabled={loading}
            className="flex-1 bg-green-600 text-white py-3 rounded-none hover:bg-green-700 transition-colors"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <LoadingSpinner size="sm" className="text-white" />
                SAVING...
              </div>
            ) : (
              "SAVE CHANGES"
            )}
          </Button>
          <Button
            type="button"
            onClick={handleCancel}
            disabled={loading}
            className="flex-1 bg-gray-600 text-white py-3 rounded-none hover:bg-gray-700 transition-colors"
          >
            CANCEL
          </Button>
        </div>
      </form>
    </div>
  );
};
