"use client";

import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ToolButtonProps {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
}

export const ToolButton = ({
  label,
  icon: Icon,
  onClick,
  isActive,
  isDisabled,
}: ToolButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            className={cn(
              "group p-2 rounded-md flex items-center justify-center bg-white hover:bg-neutral-100 transition-colors",
              isActive && "bg-blue-100 hover:bg-blue-100",
              isDisabled && "opacity-50 cursor-not-allowed hover:bg-white"
            )}
            onClick={onClick}
            disabled={isDisabled}
            aria-label={label}
          >
            <Icon
              className={cn(
                "h-5 w-5 text-neutral-500 group-hover:text-neutral-700",
                isActive && "text-blue-700 group-hover:text-blue-700"
              )}
            />
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom" align="center">
          <p className="font-medium">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
