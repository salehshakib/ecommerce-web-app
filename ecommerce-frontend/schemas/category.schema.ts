import { z } from "zod"

// Category type schema (for modals)
export const typeSchema = z.object({
  name: z.string().min(1, "Type name is required"),
  description: z.string().optional(),
});

export type TypeFormData = z.infer<typeof typeSchema>;