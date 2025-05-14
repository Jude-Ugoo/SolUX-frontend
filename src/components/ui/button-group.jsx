import React from "react";
import { cn } from "@/lib/utils";

export const ButtonGroup = React.forwardRef(
  (
    { className, variant = "default", size = "default", children, ...props },
    ref
  ) => {
    // Clone children and add special classes for grouped buttons
    const childrenWithProps = React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child)) return child;

      // Determine the border radius based on position in group
      let positionClasses = "";
      if (index === 0) {
        positionClasses = "rounded-r-none border-r-0";
      } else if (index === React.Children.count(children) - 1) {
        positionClasses = "rounded-l-none";
      } else {
        positionClasses = "rounded-none border-r-0";
      }

      // Apply variant and size if not specified on child
      const childVariant = child.props.variant || variant;
      const childSize = child.props.size || size;

      return React.cloneElement(child, {
        className: cn(child.props.className, positionClasses),
        variant: childVariant,
        size: childSize,
      });
    });

    return (
      <div className={cn("inline-flex", className)} ref={ref} {...props}>
        {childrenWithProps}
      </div>
    );
  }
);

ButtonGroup.displayName = "ButtonGroup";

export default ButtonGroup;
