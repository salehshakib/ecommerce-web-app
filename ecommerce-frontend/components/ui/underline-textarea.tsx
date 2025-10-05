import * as React from "react";

import { cn } from "@/lib/utils";

interface UnderlineTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const UnderlineTextarea = React.forwardRef<
  HTMLTextAreaElement,
  UnderlineTextareaProps
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "w-full border-0 border-b border-gray-300 bg-transparent px-0 py-2 text-base placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 resize-none",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
UnderlineTextarea.displayName = "UnderlineTextarea";

export { UnderlineTextarea };
