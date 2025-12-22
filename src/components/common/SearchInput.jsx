import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export const SearchInput = React.forwardRef(
  ({ className, inputClassName, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex items-center gap-3 rounded-md bg-muted px-4 py-2",
          className
        )}
      >
        <Search className="h-4 w-4 text-muted-foreground" />

        <input
          ref={ref}
          type="text"
          className={cn(
            "w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground",
            inputClassName
          )}
          {...props}
        />
      </div>
    );
  }
);