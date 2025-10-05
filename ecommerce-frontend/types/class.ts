// Class booking form data
export interface CreateClassBookingRequest {
  name: string;
  email: string;
  phoneNumber: string;
  classType: string; // This will be the class title from settings
  preferredDateTime: string; // ISO date string with time
  numberOfParticipants: number;
  notes?: string;
}

export interface ClassBookingResponse {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  classType: string;
  preferredDateTime: string;
  numberOfParticipants: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ClassBookingsListResponse {
  message: string;
  bookings: ClassBookingResponse[];
  total?: number;
  page?: number;
  limit?: number;
}

export interface ClassBookingByIdResponse {
  message: string;
  booking: ClassBookingResponse;
}

export interface UpdateClassBookingRequest extends Partial<CreateClassBookingRequest> {
  _id: string;
}

export interface DeleteClassBookingResponse {
  message: string;
  success: boolean;
}

// Helper type for class selection options
export interface ClassOption {
  title: string;
  image: string;
  date: string;
  time: string;
}

// Time slots for class booking
export const TIME_SLOTS = [
  '09:00',
  '10:00',
  '11:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
] as const;

export type TimeSlot = typeof TIME_SLOTS[number];