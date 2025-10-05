import * as z from "zod";

// Class booking form schema - keeping all as strings for form input compatibility
export const classBookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().min(10, "Please enter a valid phone number"),
  classType: z.string().min(1, "Please select a class"),
  selectedDate: z.string().min(1, "Please select a date"),
  selectedTime: z.string().min(1, "Please select a time"),
  numberOfParticipants: z.string().min(1, "Please enter number of participants").refine(
    (val) => !isNaN(Number(val)) && Number(val) >= 1,
    "Number of participants must be at least 1"
  ),
  notes: z.string().optional(),
});

// Form data type
export type ClassBookingFormData = z.infer<typeof classBookingSchema>;