"use client";

import { useQuery } from "@tanstack/react-query";
import { profileApi } from "@/lib/api/endpoints/user.api";
import { createAuthorizedFetch } from "@/lib/api/utils/authorized-fetch";
import type { ProfileResponse } from "@/types/auth";

// Query function
const getUserProfile = async (): Promise<ProfileResponse> => {
  return createAuthorizedFetch(profileApi.GET_PROFILE);
};

export const useProfileQuery = (isEnabled: boolean = true) => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getUserProfile,
    enabled: isEnabled,
    // Uses default options: staleTime: 5min, gcTime: 20min, retry: 2
    // Unauthorized errors are handled by authorized fetch
  });
};
