"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EditProfile } from "@/components/user/edit-profile";
import { useAuth } from "@/contexts/auth-context";
import { useUpdateProfileMutation } from "@/hooks/mutations/use-profile-mutations";
import { ProfileResponse } from "@/types/auth";
import { Edit2, User, Mail, Calendar } from "lucide-react";
import { buildCloudinaryUrl } from "@/utils/image-upload";
import { Loading } from "@/components/ui/loading";

export default function UserProfile() {
  const { profile } = useAuth();
  const updateProfileMutation = useUpdateProfileMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  const handleEdit = () => {
    setIsEditing(true);
    setError("");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError("");
  };

  const handleProfileUpdate = async (updatedProfile: ProfileResponse) => {
    try {
      await updateProfileMutation.mutateAsync(updatedProfile);
      setIsEditing(false);
      setError("");
    } catch (error: any) {
      setError(error?.message || "Failed to update profile");
    }
  };

  if (!profile) {
    return <Loading message="Loading your profile..." size="md" fullScreen />;
  }

  return (
    <div className="flex justify-center min-h-screen py-8 px-4">
      <div className="w-full max-w-5xl space-y-6">
        <div className="flex justify-between items-center">
          <div className="text-center flex-1">
            <h2 className="text-3xl font-bold tracking-wider">Profile</h2>
            <p className="text-muted-foreground mt-2">
              Manage your account information
            </p>
          </div>
          {!isEditing && (
            <Button
              onClick={handleEdit}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </Button>
          )}
        </div>

        {!isEditing ? (
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded">
                {error}
              </div>
            )}

            <div className="space-y-6">
              <div className="flex items-center justify-center">
                {profile?.avatar ? (
                  <img
                    src={buildCloudinaryUrl(profile?.avatar) || profile?.avatar}
                    alt="Profile Avatar"
                    className="w-32 h-32 rounded-md object-contain border border-gray-200"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-300">
                    <User className="w-16 h-16 text-gray-500" />
                  </div>
                )}
              </div>

              <div className="grid gap-6">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <User className="w-5 h-5 text-gray-600" />
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Username
                    </label>
                    <p className="text-lg font-semibold">{profile?.userName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <p className="text-lg font-semibold">{profile?.email}</p>
                  </div>
                </div>

                {profile?.createdAt && (
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-gray-600" />
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Member Since
                      </label>
                      <p className="text-lg font-semibold">
                        {new Date(profile.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <EditProfile
            profile={profile}
            onProfileUpdate={handleProfileUpdate}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
}
