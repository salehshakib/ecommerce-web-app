"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import * as React from "react";

interface StepperProps {
  steps: Array<{ title: string; description?: string }>;
  currentStep: number;
  onStepChange: (step: number) => void;
}

export function Stepper({ steps, currentStep, onStepChange }: StepperProps) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.title}>
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full border-2 flex items-center justify-center relative transition-all duration-200",
                  index < currentStep
                    ? "bg-primary border-primary text-white"
                    : index === currentStep
                    ? "bg-primary border-primary text-white"
                    : "border-primary text-primary bg-white"
                )}
              >
                {index < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-semibold">{index + 1}</span>
                )}
              </div>
              <div className="mt-3 text-center">
                <p
                  className={cn(
                    "text-sm font-medium",
                    index <= currentStep
                      ? "text-gray-900"
                      : "text-gray-500"
                  )}
                >
                  {step.title}
                </p>
                {step.description && (
                  <p className="text-xs text-gray-500 mt-1">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 h-[2px] bg-gray-200 mx-4 relative">
                <div
                  className={cn(
                    "absolute top-0 left-0 h-full transition-all duration-300",
                    index < currentStep ? "bg-primary w-full" : "bg-gray-200 w-0"
                  )}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
