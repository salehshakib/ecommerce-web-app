import * as z from "zod";

// Investor form schema - keeping all as strings for form input compatibility
export const investorSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().min(10, "Please enter a valid phone number"),
  investmentAmount: z.string().min(1, "Please enter investment amount").refine(
    (val) => !isNaN(Number(val)) && Number(val) > 0,
    "Investment amount must be greater than 0"
  ),
  investmentType: z.string().min(1, "Please select an investment type"),
  message: z.string().optional(),
});

// Form data type
export type InvestorFormData = z.infer<typeof investorSchema>;