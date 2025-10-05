import * as z from "zod";

// Event form schema - keeping all as strings for form input compatibility
export const eventFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().min(10, "Please enter a valid phone number"),
  eventType: z.string().min(1, "Please select an event type"),
  dateTime: z.string().min(1, "Please select date and time"),
  numberOfGuests: z.string().min(1, "Please enter number of guests").refine(
    (val) => !isNaN(Number(val)) && Number(val) >= 1,
    "Number of guests must be at least 1"
  ),
  specialRequests: z.string().optional(),
});

// Form data type
export type EventFormData = z.infer<typeof eventFormSchema>;