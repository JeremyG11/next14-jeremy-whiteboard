"use client";

import { LucideIcon } from "lucide-react";

import { ToolTip } from "./ToolTip";
import { Button } from "@/components/ui/button";

interface ToolButtonProps {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
  tooltipDirection?: "top" | "right" | "bottom" | "left";
}

export const ToolButton = ({
  label,
  icon: Icon,
  onClick,
  isActive,
  isDisabled,
  tooltipDirection = "right",
}: ToolButtonProps) => {
  return (
    <ToolTip label={label} side="top" sideOffset={14}>
      <Button
        disabled={isDisabled}
        onClick={onClick}
        size="icon"
        variant={isActive ? "active" : "board"}
        className="p-2.5 hover:bg-gray-100 transition-all duration-300 rounded border-0 shadow-none"
      >
        <Icon />
      </Button>
    </ToolTip>
  );
};
