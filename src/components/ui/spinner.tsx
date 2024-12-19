import React from "react";

interface SpinnerProps {
  color?: string;
  className?: string;
}

export function Spinner({ color = "black", className = "" }: SpinnerProps) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`w-5 h-5 border-4 border-t-transparent rounded-full animate-spin`}
        style={{ borderColor: `${color}`, borderTopColor: "transparent" }}
      ></div>
    </div>
  );
}
