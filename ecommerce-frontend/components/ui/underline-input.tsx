import * as React from "react";

import { cn } from "@/lib/utils";

interface UnderlineInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

interface UnderlineTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

interface UnderlineSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

const UnderlineInput = React.forwardRef<HTMLInputElement, UnderlineInputProps>(
  ({ className, label, error, type, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-muted-foreground tracking-wider uppercase">
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            "w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-3 text-base placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
            error && "border-destructive focus:border-destructive",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-sm text-destructive mt-1">{error}</p>}
      </div>
    );
  }
);

UnderlineInput.displayName = "UnderlineInput";

const UnderlineTextarea = React.forwardRef<HTMLTextAreaElement, UnderlineTextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-muted-foreground tracking-wider uppercase">
            {label}
          </label>
        )}
        <textarea
          className={cn(
            "w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-3 text-base placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-0 resize-none transition-colors min-h-[100px]",
            error && "border-destructive focus:border-destructive",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-sm text-destructive mt-1">{error}</p>}
      </div>
    );
  }
);

UnderlineTextarea.displayName = "UnderlineTextarea";

const UnderlineSelect = React.forwardRef<HTMLSelectElement, UnderlineSelectProps>(
  ({ className, label, error, options, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-muted-foreground tracking-wider uppercase">
            {label}
          </label>
        )}
        <select
          className={cn(
            "w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-3 text-base focus:border-primary focus:outline-none focus:ring-0 transition-colors appearance-none cursor-pointer",
            error && "border-destructive focus:border-destructive",
            className
          )}
          ref={ref}
          {...props}
        >
          <option value="" disabled>
            Select an option
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-sm text-destructive mt-1">{error}</p>}
      </div>
    );
  }
);

UnderlineSelect.displayName = "UnderlineSelect";

export { UnderlineInput, UnderlineTextarea, UnderlineSelect };
