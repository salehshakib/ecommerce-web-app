"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { settingsApi } from "@/lib/api/endpoints/settings.api";
import { createAuthorizedFetch } from "@/lib/api/utils/authorized-fetch";
import type { IUpdateSettingsData, ISettingsResponse } from "@/types/settings";

// Mutation function
const updateSettings = async (settingsData: IUpdateSettingsData): Promise<ISettingsResponse> => {
  const response = await createAuthorizedFetch(settingsApi.UPDATE_SETTINGS, {
    method: "PUT",
    body: JSON.stringify(settingsData),
  });
  return response;
};

export const useUpdateSettingsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (settings: IUpdateSettingsData) => updateSettings(settings),
    onSuccess: () => {
      // Invalidate and refetch settings
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });
};