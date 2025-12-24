import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority"


const searchInputVariants = cva(
  "flex items-center gap-3 rounded-3xl px-4 py-2 transition-colors",
  {
    variants: {
      variant: {
        default: "bg-muted border border-transparent",
        error: "bg-muted border border-red-500",
        success: "bg-muted border border-green-500",
        searchTable:" border "
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export const SearchInput = React.forwardRef(
  ({ className, inputClassName, variant, ...props }, ref) => {
    return (
      <div className={cn(searchInputVariants({ variant }), className)}>
        <Search className="h-4 w-4 text-muted-foreground" />

        <input
        placeholder="بحث"
          ref={ref}
          type="text"
          className={cn(
            "w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground",
            inputClassName
          )}
          {...props}
        />
      </div>
    )
  }
)

SearchInput.displayName = "SearchInput"
