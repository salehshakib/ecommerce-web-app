"use client";

import * as React from "react";
import { X, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface MultiSelectProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select items...",
  className,
  disabled = false,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const handleUnselect = (item: string) => {
    onChange(selected.filter((s) => s !== item));
  };

  const handleSelect = (item: string) => {
    if (selected.includes(item)) {
      handleUnselect(item);
    } else {
      onChange([...selected, item]);
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between h-10 py-2 border border-gray-300 hover:bg-gray-50 hover:text-gray-900",
              !selected.length && "text-muted-foreground",
              className
            )}
            disabled={disabled}
          >
            <div className="flex gap-1 flex-wrap overflow-hidden">
              {selected.length === 0 && placeholder}
              {selected.length > 0 &&
                selected.length <= 4 &&
                selected.map((item) => (
                  <Badge
                    variant="secondary"
                    key={item}
                    className="mr-1 hover:bg-secondary/80 shrink-0"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleUnselect(item);
                    }}
                  >
                    {item}
                    <X className="ml-1 h-3 w-3 hover:bg-secondary-foreground/20 rounded-full" />
                  </Badge>
                ))}
              {selected.length > 4 && (
                <>
                  {selected.slice(0, 3).map((item) => (
                    <Badge
                      variant="secondary"
                      key={item}
                      className="mr-1 hover:bg-secondary/80 shrink-0"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleUnselect(item);
                      }}
                    >
                      {item}
                      <X className="ml-1 h-3 w-3 hover:bg-secondary-foreground/20 rounded-full" />
                    </Badge>
                  ))}
                  <Badge variant="outline" className="shrink-0">
                    +{selected.length - 3} more
                  </Badge>
                </>
              )}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandEmpty>No items found.</CommandEmpty>
              <CommandGroup className="max-h-64 overflow-auto">
                {options.map((option) => (
                  <CommandItem
                    key={option}
                    onSelect={() => handleSelect(option)}
                    className="cursor-pointer"
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        selected.includes(option)
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <Check
                        className={cn(
                          "h-3 w-3",
                          selected.includes(option)
                            ? "text-primary-foreground"
                            : ""
                        )}
                      />
                    </div>
                    {option}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
