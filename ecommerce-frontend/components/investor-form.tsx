"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { UnderlineInput, UnderlineTextarea, UnderlineSelect } from "@/components/ui/underline-input";
import { useCreateInvestorMutation } from "@/hooks/mutations/use-investors-mutations";
import { INVESTMENT_TYPES } from "@/types/investor";
import type { CreateInvestorRequest } from "@/types/investor";
import { investorSchema, type InvestorFormData } from "@/schemas/investor.schema";


export const InvestorForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createInvestorMutation = useCreateInvestorMutation();

  const investmentTypeOptions = INVESTMENT_TYPES.map(type => ({
    value: type,
    label: type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')
  }));

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InvestorFormData>({
    resolver: zodResolver(investorSchema),
  });

  const onSubmit = async (data: InvestorFormData) => {
    setIsSubmitting(true);
    try {
      const investorData: CreateInvestorRequest = {
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        investmentAmount: parseFloat(data.investmentAmount),
        investmentType: data.investmentType,
        message: data.message,
      };

      await createInvestorMutation.mutateAsync(investorData);
      reset(); // Reset form after successful submission
    } catch (error) {
      console.error("Failed to submit investment inquiry:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-light mb-4 tracking-wider">
          INVESTMENT <span className="text-primary">INQUIRY</span>
        </h2>
        <p className="text-lg text-muted-foreground">
          Join us in creating exceptional fragrance experiences and building a luxury perfume empire
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <UnderlineInput
            label="Full Name"
            placeholder="Enter your full name"
            {...register("fullName")}
            error={errors.fullName?.message}
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
            label="Investment Amount ($)"
            type="number"
            min="1"
            placeholder="Enter investment amount"
            {...register("investmentAmount")}
            error={errors.investmentAmount?.message}
          />
        </div>

        <UnderlineSelect
          label="Investment Type"
          options={investmentTypeOptions}
          {...register("investmentType")}
          error={errors.investmentType?.message}
        />

        <UnderlineTextarea
          label="Message"
          placeholder="Tell us about your investment goals and how you'd like to collaborate with us..."
          {...register("message")}
          error={errors.message?.message}
        />

        <div className="text-center pt-8">
          <Button
            type="submit"
            size="lg"
            className="px-12 py-3 bg-primary hover:bg-primary/90 text-white tracking-wider font-medium"
            disabled={isSubmitting || createInvestorMutation.isPending}
          >
            {isSubmitting || createInvestorMutation.isPending ? "SUBMITTING..." : "SUBMIT INQUIRY"}
          </Button>
        </div>
      </form>
    </div>
  );
};