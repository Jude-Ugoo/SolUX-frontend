import React from "react";
import { cn } from "@/lib/utils";

const iconButtonVariants = {
  default: "bg-black text-white hover:bg-black/90",
  outline: "border border-gray-300 bg-white text-black hover:bg-gray-100",
  primary: "bg-[#00FF94] text-black hover:bg-[#00FF94]/90",
  secondary: "bg-gray-200 text-black hover:bg-gray-300",
  ghost: "hover:bg-gray-100",
};

const iconButtonSizes = {
  default: "h-10 w-10",
  sm: "h-8 w-8",
  lg: "h-12 w-12",
};

export const IconButton = React.forwardRef(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? "slot" : "button";

    return (
      <Comp
        className={cn(
          "rounded-full inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          iconButtonVariants[variant],
          iconButtonSizes[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

IconButton.displayName = "IconButton";

export default IconButton;
