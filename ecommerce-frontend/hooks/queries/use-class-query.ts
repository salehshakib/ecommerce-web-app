"use client";

import { useQuery } from "@tanstack/react-query";
import { classesApi } from "@/lib/api/endpoints/class.api";
import { createAuthorizedFetch } from "@/lib/api/utils/authorized-fetch";
import type { ClassBookingsListResponse, ClassBookingByIdResponse } from "@/types/class";

// Get all class bookings
const fetchClassBookings = async (): Promise<ClassBookingsListResponse> => {
  const response = await createAuthorizedFetch(classesApi.GET_ALL, {
    method: "GET",
  });
  return response;
};

export const useClassBookingsQuery = () => {
  return useQuery({
    queryKey: ["class-bookings"],
    queryFn: fetchClassBookings,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Get class booking by ID
const fetchClassBookingById = async (id: string): Promise<ClassBookingByIdResponse> => {
  const response = await createAuthorizedFetch(`${classesApi.GET_BY_ID}/${id}`, {
    method: "GET",
  });
  return response;
};

export const useClassBookingByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ["class-booking", id],
    queryFn: () => fetchClassBookingById(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!id, // Only run if ID is provided
  });
};