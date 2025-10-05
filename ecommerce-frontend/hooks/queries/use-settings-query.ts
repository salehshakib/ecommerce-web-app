"use client";

import { useQuery } from "@tanstack/react-query";
import { settingsApi } from "@/lib/api/endpoints/settings.api";
import { createAuthorizedFetch } from "@/lib/api/utils/authorized-fetch";
import type { ISettingsResponse } from "@/types/settings";
import { createPublicFetch } from "@/lib/api/utils/public-fetch";

// Query function
const getSettings = async (): Promise<ISettingsResponse> => {
  return createPublicFetch(settingsApi.GET_SETTINGS);
};

export const useSettingsQuery = () => {
  return useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
    select: (data: ISettingsResponse) => {
      // Return the first settings object if available
      return data.settings && data.settings.length > 0
        ? data.settings[0]
        : null;
    },
  });
};
