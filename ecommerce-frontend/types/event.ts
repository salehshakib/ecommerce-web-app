// Event form data based on the mutation file structure
export interface CreateEventRequest {
  name: string;
  email: string;
  phoneNumber: string;
  eventType: string;
  dateTime: string; // ISO date string
  numberOfGuests: number;
  specialRequests?: string;
}

export interface EventResponse {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  eventType: string;
  dateTime: string;
  numberOfGuests: number;
  specialRequests?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface EventsListResponse {
  message: string;
  events: EventResponse[];
  total?: number;
  page?: number;
  limit?: number;
}

export interface EventByIdResponse {
  message: string;
  event: EventResponse;
}

export interface UpdateEventRequest extends Partial<CreateEventRequest> {
  _id: string;
}

export interface DeleteEventResponse {
  message: string;
  success: boolean;
}

// Event types for the form dropdown
export const EVENT_TYPES = [
  'wedding',
  'corporate',
  'birthday',
  'anniversary',
  'product-launch',
  'exhibition',
  'gala',
  'private-party',
  'other'
] as const;

export type EventType = typeof EVENT_TYPES[number];