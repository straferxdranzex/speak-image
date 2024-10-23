import * as React from "react";
import { cn } from "../../lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "w-full h-12 sm:h-[4.5rem] bg-white border border-border rounded-xl text-sm leading-none px-6 text-[#5a5a5a] flex ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-text placeholder:text-muted-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
