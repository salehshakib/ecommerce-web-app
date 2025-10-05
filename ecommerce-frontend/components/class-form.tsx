"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { UnderlineInput, UnderlineTextarea, UnderlineSelect } from "@/components/ui/underline-input";
import { useCreateClassBookingMutation } from "@/hooks/mutations/use-class-mutations";
import { useCombinedDataContext } from "@/providers/combined-data-provider";
import { TIME_SLOTS } from "@/types/class";
import type { CreateClassBookingRequest, ClassOption } from "@/types/class";
import { classBookingSchema, type ClassBookingFormData } from "@/schemas/class.schema";
import Image from "next/image";


// Custom class selection component
interface ClassSelectProps {
  label?: string;
  error?: string;
  value?: string;
  onChange: (value: string) => void;
  classes: ClassOption[];
}

const ClassSelect = ({ label, error, value, onChange, classes }: ClassSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedClass = classes.find(cls => cls.title === value);

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-muted-foreground tracking-wider uppercase">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-3 text-base focus:border-primary focus:outline-none focus:ring-0 transition-colors text-left ${
            error && "border-destructive focus:border-destructive"
          }`}
        >
          {selectedClass ? selectedClass.title : "Select a class"}
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
            {classes.map((cls) => (
              <div
                key={cls.title}
                onClick={() => {
                  onChange(cls.title);
                  setIsOpen(false);
                }}
                className="flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
              >
                <div className="relative w-16 h-16 mr-4 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={cls.image}
                    alt={cls.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{cls.title}</h4>
                  <p className="text-xs text-gray-500">
                    {new Date(cls.date).toLocaleDateString()} at {cls.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {error && <p className="text-sm text-destructive mt-1">{error}</p>}
    </div>
  );
};

export const ClassForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createClassBookingMutation = useCreateClassBookingMutation();
  const { settings } = useCombinedDataContext();

  const upcomingClasses = settings?.upcomingClasses || [];
  const timeSlotOptions = TIME_SLOTS.map(time => ({
    value: time,
    label: time
  }));

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    // setValue,
    // watch,
  } = useForm<ClassBookingFormData>({
    resolver: zodResolver(classBookingSchema),
  });

  // const selectedClass = watch("classType");

  const onSubmit = async (data: ClassBookingFormData) => {
    setIsSubmitting(true);
    try {
      // Combine date and time into ISO string
      const dateTime = new Date(`${data.selectedDate}T${data.selectedTime}`);

      const bookingData: CreateClassBookingRequest = {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        classType: data.classType,
        preferredDateTime: dateTime.toISOString(),
        numberOfParticipants: parseInt(data.numberOfParticipants, 10),
        notes: data.notes,
      };

      await createClassBookingMutation.mutateAsync(bookingData);
      reset(); // Reset form after successful submission
    } catch (error) {
      console.error("Failed to submit class booking:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (upcomingClasses.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <h2 className="text-2xl font-light mb-4 tracking-wider">
          No Classes Available
        </h2>
        <p className="text-muted-foreground">
          There are currently no upcoming classes available for booking. Please check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-light mb-4 tracking-wider">
          BOOK A <span className="text-primary">CLASS</span>
        </h2>
        <p className="text-lg text-muted-foreground">
          Join our exclusive perfume workshops and learn the art of fragrance creation
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

          <UnderlineInput
            label="Number of Participants"
            type="number"
            min="1"
            placeholder="How many participants?"
            {...register("numberOfParticipants")}
            error={errors.numberOfParticipants?.message}
          />
        </div>

        {/* <ClassSelect
          label="Select Class"
          value={selectedClass}
          onChange={(value) => setValue("classType", value)}
          classes={upcomingClasses}
          error={errors.classType?.message}
        /> */}

        <UnderlineInput
          label="Class Type"
          placeholder="Enter class type"
          {...register("classType")}
          error={errors.classType?.message}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <UnderlineInput
            label="Preferred Date"
            type="date"
            {...register("selectedDate")}
            error={errors.selectedDate?.message}
          />

          <UnderlineSelect
            label="Preferred Time"
            options={timeSlotOptions}
            {...register("selectedTime")}
            error={errors.selectedTime?.message}
          />
        </div>

        <UnderlineTextarea
          label="Notes"
          placeholder="Tell us about any special requirements or preferences for your class..."
          {...register("notes")}
          error={errors.notes?.message}
        />

        <div className="text-center pt-8">
          <Button
            type="submit"
            size="lg"
            className="px-12 py-3 bg-primary hover:bg-primary/90 text-white tracking-wider font-medium"
            disabled={isSubmitting || createClassBookingMutation.isPending}
          >
            {isSubmitting || createClassBookingMutation.isPending ? "SUBMITTING..." : "BOOK CLASS"}
          </Button>
        </div>
      </form>
    </div>
  );
};