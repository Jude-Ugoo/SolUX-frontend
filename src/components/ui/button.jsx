import React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = {
  default: "bg-black text-white hover:bg-black/90",
  outline: "border border-gray-300 bg-white text-black hover:bg-gray-100",
  primary: "bg-[#00FF94] text-black hover:bg-[#00FF94]/90",
  secondary: "bg-gray-200 text-black hover:bg-gray-300",
  ghost: "hover:bg-gray-100",
  link: "text-black underline-offset-4 hover:underline",
};

const buttonSizes = {
  default: "h-10 px-4 py-2",
  sm: "h-8 px-3 py-1 text-sm",
  lg: "h-12 px-6 py-3 text-lg",
  icon: "h-9 w-9",
};

export const Button = React.forwardRef(
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
          "rounded-md font-medium inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          buttonVariants[variant],
          buttonSizes[size],
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

Button.displayName = "Button";

export default Button;
