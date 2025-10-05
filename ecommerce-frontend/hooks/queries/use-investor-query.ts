"use client";

import { useQuery } from "@tanstack/react-query";
import { createAuthorizedFetch } from "@/lib/api/utils/authorized-fetch";
import { investorsApi } from "@/lib/api/endpoints/investor.api";
import type { InvestorsListResponse, InvestorByIdResponse } from "@/types/investor";

// Get all investors
const fetchInvestors = async (): Promise<InvestorsListResponse> => {
  const response = await createAuthorizedFetch(investorsApi.GET_ALL);
  return response;
};

export const useInvestorsQuery = () => {
  return useQuery({
    queryKey: ["investors"],
    queryFn: fetchInvestors,
  });
};

// Get investor by ID
const fetchInvestorById = async (id: string): Promise<InvestorByIdResponse> => {
  const response = await createAuthorizedFetch(`${investorsApi.GET_BY_ID}/${id}`);
  return response;
};

export const useInvestorByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ["investor", id],
    queryFn: () => fetchInvestorById(id),
    enabled: !!id,
  });
};