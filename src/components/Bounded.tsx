import React from "react";
import { cn } from "@/lib/utils";

type BoundedProps = {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  withPadding?: boolean;
};

export default function Bounded({
  as: Comp = "section",
  className,
  children,
  size = "lg",
  withPadding = true,
}: BoundedProps) {
  const sizeClasses = {
    sm: "max-w-4xl",
    md: "max-w-5xl",
    lg: "max-w-6xl",
    xl: "max-w-7xl",
  };

  return (
    <Comp className={cn("relative", className)}>
      {/* Circuit Board Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main circuit lines */}
        <div className="absolute inset-0 opacity-[0.08]">
          <svg
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern
                id="circuit-pattern"
                x="0"
                y="0"
                width="200"
                height="200"
                patternUnits="userSpaceOnUse"
              >
                {/* Horizontal lines */}
                <line
                  x1="0"
                  y1="50"
                  x2="200"
                  y2="50"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-accent"
                />
                <line
                  x1="0"
                  y1="150"
                  x2="200"
                  y2="150"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-accent"
                />

                {/* Vertical lines */}
                <line
                  x1="50"
                  y1="0"
                  x2="50"
                  y2="200"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-accent"
                />
                <line
                  x1="150"
                  y1="0"
                  x2="150"
                  y2="200"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-accent"
                />

                {/* Circuit nodes */}
                <circle
                  cx="50"
                  cy="50"
                  r="4"
                  fill="currentColor"
                  className="text-accent"
                />
                <circle
                  cx="150"
                  cy="50"
                  r="4"
                  fill="currentColor"
                  className="text-accent"
                />
                <circle
                  cx="50"
                  cy="150"
                  r="4"
                  fill="currentColor"
                  className="text-accent"
                />
                <circle
                  cx="150"
                  cy="150"
                  r="4"
                  fill="currentColor"
                  className="text-accent"
                />

                {/* Diagonal connections */}
                <line
                  x1="50"
                  y1="50"
                  x2="150"
                  y2="150"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-accent"
                />
                <line
                  x1="150"
                  y1="50"
                  x2="50"
                  y2="150"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-accent"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
          </svg>
        </div>

        {/* Animated data flow lines */}
        <div className="absolute inset-0 opacity-[0.06]">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent animate-pulse"></div>
          <div
            className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-accent to-transparent animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-accent to-transparent animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-accent to-transparent animate-pulse"
            style={{ animationDelay: "1.5s" }}
          ></div>
        </div>

        {/* Subtle scan lines */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, currentColor 2px, currentColor 4px)",
              backgroundSize: "100% 4px",
            }}
          ></div>
        </div>

        {/* Additional circuit elements */}
        <div className="absolute inset-0 opacity-[0.05]">
          <svg
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern
                id="circuit-pattern-2"
                x="0"
                y="0"
                width="300"
                height="300"
                patternUnits="userSpaceOnUse"
              >
                {/* Larger circuit elements */}
                <rect
                  x="100"
                  y="100"
                  width="100"
                  height="100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-accent"
                />
                <circle
                  cx="150"
                  cy="150"
                  r="8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-accent"
                />
                <line
                  x1="150"
                  y1="142"
                  x2="150"
                  y2="158"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-accent"
                />
                <line
                  x1="142"
                  y1="150"
                  x2="158"
                  y2="150"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-accent"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit-pattern-2)" />
          </svg>
        </div>
      </div>

      {/* Content Container */}
      <div
        className={cn(
          "relative mx-auto",
          sizeClasses[size],
          withPadding && "px-4 py-8 md:px-6 md:py-12"
        )}
      >
        {children}
      </div>
    </Comp>
  );
}
