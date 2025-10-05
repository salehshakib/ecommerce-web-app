"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { eventApi } from "@/lib/api/endpoints/event.api";
import { createAuthorizedFetch } from "@/lib/api/utils/authorized-fetch";
import { toast } from "sonner";
import type {
  CreateEventRequest,
  EventResponse,
  UpdateEventRequest,
  DeleteEventResponse,
  EventByIdResponse
} from "@/types/event";

// Create event
const createEvent = async (data: CreateEventRequest): Promise<EventByIdResponse> => {
  const response = await createAuthorizedFetch(eventApi.CREATE, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response;
};

export const useCreateEventMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Event request submitted successfully!", {
        description: "We'll contact you soon to confirm the details.",
      });
    },
    onError: (error: any) => {
      toast.error("Failed to submit event request", {
        description: error?.message || "Please try again later.",
      });
    },
  });
};

// Update event
const updateEvent = async (data: UpdateEventRequest): Promise<EventByIdResponse> => {
  const { _id, ...updateData } = data;
  const response = await createAuthorizedFetch(`${eventApi.UPDATE}/${_id}`, {
    method: "PUT",
    body: JSON.stringify(updateData),
  });
  return response;
};

export const useUpdateEventMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEvent,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["event", data.event._id] });
      toast.success("Event updated successfully!");
    },
    onError: (error: any) => {
      toast.error("Failed to update event", {
        description: error?.message || "Please try again later.",
      });
    },
  });
};

// Delete event
const deleteEvent = async (id: string): Promise<DeleteEventResponse> => {
  const response = await createAuthorizedFetch(`${eventApi.DELETE}/${id}`, {
    method: "DELETE",
  });
  return response;
};

export const useDeleteEventMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Event deleted successfully!");
    },
    onError: (error: any) => {
      toast.error("Failed to delete event", {
        description: error?.message || "Please try again later.",
      });
    },
  });
};