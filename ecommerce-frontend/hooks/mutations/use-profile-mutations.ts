"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { profileApi } from "@/lib/api/endpoints/user.api";
import { createAuthorizedFetch } from "@/lib/api/utils/authorized-fetch";
import type { ProfileResponse, UpdateProfileData } from "@/types/auth";

// Mutation function
const updateUserProfile = async (profileData: UpdateProfileData): Promise<ProfileResponse> => {
  const response = await createAuthorizedFetch(profileApi.UPDATE_PROFILE, {
    method: "PUT",
    body: JSON.stringify(profileData),
  });
  return response;
};

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileData) => updateUserProfile(data),
    onSuccess: (updatedProfile: ProfileResponse) => {
      // Update the profile query cache
      queryClient.setQueryData(["profile"], updatedProfile);

      // Optionally refetch to ensure consistency
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: any) => {
      // Unauthorized errors are handled by authorized fetch
      console.error("Profile update failed:", error);
    },
  });
};

// Export the mutation function for direct use
export { updateUserProfile };