import React from "react";
import { cn } from "@/lib/utils";

const textareaVariants = {
  default: "border border-gray-300 focus:border-[#00FF94] focus:ring-[#00FF94]",
  error: "border border-red-500 focus:border-red-600 focus:ring-red-600",
  disabled: "bg-gray-100 cursor-not-allowed opacity-50",
};

export const Textarea = React.forwardRef(
  (
    {
      className,
      variant = "default",
      rows = 3,
      disabled = false,
      placeholder,
      ...props
    },
    ref
  ) => {
    const variantClass = disabled
      ? textareaVariants.disabled
      : textareaVariants[variant];

    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full rounded-md px-3 py-2 text-sm transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-offset-1",
          "placeholder:text-gray-500 resize-none",
          variantClass,
          className
        )}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
