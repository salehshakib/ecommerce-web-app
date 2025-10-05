// Investor form data
export interface CreateInvestorRequest {
  fullName: string;
  email: string;
  phoneNumber: string;
  investmentAmount: number;
  investmentType: string;
  message?: string;
}

export interface InvestorResponse {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  investmentAmount: number;
  investmentType: string;
  message?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface InvestorsListResponse {
  message: string;
  investors: InvestorResponse[];
  total?: number;
  page?: number;
  limit?: number;
}

export interface InvestorByIdResponse {
  message: string;
  investor: InvestorResponse;
}

export interface UpdateInvestorRequest extends Partial<CreateInvestorRequest> {
  _id: string;
}

export interface DeleteInvestorResponse {
  message: string;
  success: boolean;
}

// Investment type options
export const INVESTMENT_TYPES = [
  'partnership',
  'equity',
  'loan',
  'franchise',
  'joint-venture',
  'other'
] as const;

export type InvestmentType = typeof INVESTMENT_TYPES[number];