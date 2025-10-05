"use client"

import * as React from "react"
import { UseFormRegister, FieldError, FieldValues, Path } from "react-hook-form"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"

// Generic form input component
interface FormInputProps<T extends FieldValues> extends React.InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>
  label: string
  description?: string
  form: any // UseFormReturn type
}

export function FormInput<T extends FieldValues>({
  name,
  label,
  description,
  form,
  className,
  ...props
}: FormInputProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              {...props}
              className={className}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

// Generic form textarea component
interface FormTextareaProps<T extends FieldValues> extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: Path<T>
  label: string
  description?: string
  form: any
}

export function FormTextarea<T extends FieldValues>({
  name,
  label,
  description,
  form,
  className,
  ...props
}: FormTextareaProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              {...field}
              {...props}
              className={className}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

// Generic form checkbox component
interface FormCheckboxProps<T extends FieldValues> {
  name: Path<T>
  label: string
  description?: string
  form: any
}

export function FormCheckbox<T extends FieldValues>({
  name,
  label,
  description,
  form,
}: FormCheckboxProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>{label}</FormLabel>
            {description && <FormDescription>{description}</FormDescription>}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

// Multi-select checkbox component for arrays
interface FormMultiCheckboxProps<T extends FieldValues> {
  name: Path<T>
  label: string
  description?: string
  form: any
  options: string[]
  columns?: number
}

export function FormMultiCheckbox<T extends FieldValues>({
  name,
  label,
  description,
  form,
  options,
  columns = 3,
}: FormMultiCheckboxProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem>
          <div className="mb-4">
            <FormLabel className="text-base">{label}</FormLabel>
            {description && <FormDescription>{description}</FormDescription>}
          </div>
          <div className={cn("grid gap-2", {
            "grid-cols-2": columns === 2,
            "grid-cols-3": columns === 3,
            "grid-cols-4": columns === 4,
          })}>
            {options.map((option) => (
              <FormField
                key={option}
                control={form.control}
                name={name}
                render={({ field }) => {
                  return (
                    <FormItem
                      key={option}
                      className="flex flex-row items-start space-x-2 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(option)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, option])
                              : field.onChange(
                                  field.value?.filter(
                                    (value: string) => value !== option
                                  )
                                )
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        {option}
                      </FormLabel>
                    </FormItem>
                  )
                }}
              />
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}