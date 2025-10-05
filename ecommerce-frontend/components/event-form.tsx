"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { UnderlineInput, UnderlineTextarea, UnderlineSelect } from "@/components/ui/underline-input";
import { useCreateEventMutation } from "@/hooks/mutations/use-event-mutations";
import { EVENT_TYPES } from "@/types/event";
import type { CreateEventRequest } from "@/types/event";
import { eventFormSchema, type EventFormData } from "@/schemas/event.schema";


const eventTypeOptions = EVENT_TYPES.map(type => ({
  value: type,
  label: type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')
}));

export const EventForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createEventMutation = useCreateEventMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EventFormData>({
    resolver: zodResolver(eventFormSchema),
  });

  const onSubmit = async (data: EventFormData) => {
    setIsSubmitting(true);
    try {
      const eventData: CreateEventRequest = {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        eventType: data.eventType,
        dateTime: new Date(data.dateTime).toISOString(),
        numberOfGuests: parseInt(data.numberOfGuests, 10),
        specialRequests: data.specialRequests,
      };

      await createEventMutation.mutateAsync(eventData);
      reset(); // Reset form after successful submission
    } catch (error) {
      console.error("Failed to submit event request:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-light mb-4 tracking-wider">
          PRIVATE <span className="text-primary">EVENT</span>
        </h2>
        <p className="text-lg text-muted-foreground">
          Let us create an unforgettable fragrance experience for your special occasion
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <UnderlineInput
            label="Full Name"
            placeholder="Enter your full name"
            {...register("name")}
            error={errors.name?.message}
          />

          <UnderlineInput
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            error={errors.email?.message}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <UnderlineInput
            label="Phone Number"
            type="tel"
            placeholder="Enter your phone number"
            {...register("phoneNumber")}
            error={errors.phoneNumber?.message}
          />

          <UnderlineSelect
            label="Event Type"
            options={eventTypeOptions}
            {...register("eventType")}
            error={errors.eventType?.message}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <UnderlineInput
            label="Event Date & Time"
            type="datetime-local"
            {...register("dateTime")}
            error={errors.dateTime?.message}
          />

          <UnderlineInput
            label="Number of Guests"
            type="number"
            min="1"
            placeholder="How many guests?"
            {...register("numberOfGuests")}
            error={errors.numberOfGuests?.message}
          />
        </div>

        <UnderlineTextarea
          label="Special Requests"
          placeholder="Tell us about your vision, any special requirements, or preferences for your event..."
          {...register("specialRequests")}
          error={errors.specialRequests?.message}
        />

        <div className="text-center pt-8">
          <Button
            type="submit"
            size="lg"
            className="px-12 py-3 bg-primary hover:bg-primary/90 text-white tracking-wider font-medium"
            disabled={isSubmitting || createEventMutation.isPending}
          >
            {isSubmitting || createEventMutation.isPending ? "SUBMITTING..." : "REQUEST EVENT"}
          </Button>
        </div>
      </form>
    </div>
  );
};