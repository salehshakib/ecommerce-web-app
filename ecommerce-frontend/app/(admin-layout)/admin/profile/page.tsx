"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { useUpdateProfileMutation } from "@/hooks/mutations/use-profile-mutations";
import { ProfileResponse } from "@/types/auth";
import { Edit2, User, Mail, Calendar, Shield } from "lucide-react";
import { buildCloudinaryUrl } from "@/utils/image-upload";
import { Loading } from "@/components/ui/loading";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function AdminProfile() {
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
    <div className="space-y-6 px-4 sm:px-0 max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/admin">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Profile</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Admin Profile
          </h1>
          <p className="text-muted-foreground">
            Manage your administrator account information
          </p>
        </div>
        {!isEditing && (
          <Button
            onClick={handleEdit}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90"
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
            {/* Profile Avatar */}
            <div className="flex items-center justify-center">
              {profile?.avatar ? (
                <img
                  src={buildCloudinaryUrl(profile?.avatar) || profile?.avatar}
                  alt="Profile Avatar"
                  className="w-32 h-32 rounded-full object-cover border-4 border-primary/20"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center border-4 border-primary/20">
                  <User className="w-16 h-16 text-primary" />
                </div>
              )}
            </div>

            {/* Admin Badge */}
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full border border-primary/20">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">Administrator</span>
              </div>
            </div>

            {/* Profile Information */}
            <div className="grid gap-6">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border">
                <User className="w-5 h-5 text-gray-600" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <p className="text-lg font-semibold text-gray-900">{profile?.userName}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border">
                <Mail className="w-5 h-5 text-gray-600" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <p className="text-lg font-semibold text-gray-900">{profile?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border">
                <Shield className="w-5 h-5 text-gray-600" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <p className="text-lg font-semibold text-primary capitalize">{profile?.role}</p>
                </div>
              </div>

              {profile?.createdAt && (
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Admin Since
                    </label>
                    <p className="text-lg font-semibold text-gray-900">
                      {new Date(profile.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Admin Actions */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  onClick={() => window.location.href = '/admin/settings'}
                  className="flex items-center gap-2 justify-start h-auto p-4"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Site Settings</p>
                    <p className="text-sm text-muted-foreground">Configure website settings</p>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => window.location.href = '/admin/users'}
                  className="flex items-center gap-2 justify-start h-auto p-4"
                >
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <User className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Manage Users</p>
                    <p className="text-sm text-muted-foreground">View and manage user accounts</p>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Edit Profile</h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handleProfileUpdate(profile)}
                  className="bg-primary hover:bg-primary/90"
                >
                  Save Changes
                </Button>
              </div>
            </div>

            {/* TODO: Implement edit form similar to user edit profile */}
            <div className="text-center py-8 text-muted-foreground">
              <p>Profile editing functionality will be implemented here.</p>
              <p className="text-sm">This will include username, email, and avatar upload capabilities.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}