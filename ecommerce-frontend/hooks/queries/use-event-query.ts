"use client";

import { useQuery } from "@tanstack/react-query";
import { eventApi } from "@/lib/api/endpoints/event.api";
import { createAuthorizedFetch } from "@/lib/api/utils/authorized-fetch";
import type { EventsListResponse, EventByIdResponse } from "@/types/event";

// Get all events
const fetchEvents = async (): Promise<EventsListResponse> => {
  const response = await createAuthorizedFetch(eventApi.GET_ALL, {
    method: "GET",
  });
  return response;
};

export const useEventsQuery = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Get event by ID
const fetchEventById = async (id: string): Promise<EventByIdResponse> => {
  const response = await createAuthorizedFetch(`${eventApi.GET_BY_ID}/${id}`, {
    method: "GET",
  });
  return response;
};

export const useEventByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ["event", id],
    queryFn: () => fetchEventById(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!id, // Only run if ID is provided
  });
};