// components/ui/ProgressBar.tsx
import React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
  showPercentage?: boolean;
  color?: "blue" | "green" | "yellow" | "red";
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  className,
  showPercentage = false,
  color = "blue",
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  const colors = {
    blue: "bg-blue-600",
    green: "bg-green-600",
    yellow: "bg-yellow-600",
    red: "bg-red-600",
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between items-center mb-1">
        <div className="text-sm font-medium text-gray-700">
          ${value.toLocaleString()} de ${max.toLocaleString()}
        </div>
        {showPercentage && (
          <div className="text-sm text-gray-500">{percentage.toFixed(1)}%</div>
        )}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={cn(
            "h-2 rounded-full transition-all duration-300",
            colors[color]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
