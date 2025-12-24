import * as React from "react"

import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority";


const inputVariants = cva(
  "flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-input focus-visible:ring-ring",
        error: "border-red-500 focus-visible:ring-red-500",
        success: "border-green-500 focus-visible:ring-green-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)
const Input = React.forwardRef(
  ({ className, variant, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          inputVariants({ variant }),
          className
        )}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export { Input, inputVariants }
