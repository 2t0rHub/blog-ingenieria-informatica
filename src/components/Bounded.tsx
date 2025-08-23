"use client";
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";

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
  const containerRef = useRef<HTMLElement>(null);
  const circuitRef = useRef<SVGSVGElement>(null);
  const dataFlowRef = useRef<HTMLDivElement>(null);

  const sizeClasses = {
    sm: "max-w-4xl",
    md: "max-w-5xl",
    lg: "max-w-6xl",
    xl: "max-w-7xl",
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate circuit lines on mount
      const lines = circuitRef.current?.querySelectorAll("line");
      if (lines) {
        gsap.fromTo(
          lines,
          {
            strokeDasharray: "0 100",
            opacity: 0,
          },
          {
            strokeDasharray: "100 0",
            opacity: 1,
            duration: 2,
            stagger: 0.1,
            ease: "power2.out",
          }
        );

        // Add electric pulse glow animation
        gsap.to(lines, {
          filter:
            "drop-shadow(0 0 3px currentColor) drop-shadow(0 0 6px currentColor)",
          duration: 2,
          stagger: 0.2,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
        });
      }

      // Animate circuit nodes
      const circles = circuitRef.current?.querySelectorAll("circle");
      if (circles) {
        gsap.fromTo(
          circles,
          {
            scale: 0,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 1.5,
            stagger: 0.2,
            ease: "back.out(1.7)",
          }
        );

        // Add pulsing glow to nodes
        gsap.to(circles, {
          filter:
            "drop-shadow(0 0 4px currentColor) drop-shadow(0 0 8px currentColor)",
          scale: 1.1,
          duration: 1.5,
          stagger: 0.3,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
        });
      }

      // Animate data flow lines with continuous pulse
      const dataFlowLines = dataFlowRef.current?.querySelectorAll("div");
      if (dataFlowLines) {
        gsap.to(dataFlowLines, {
          opacity: 0.08,
          filter: "drop-shadow(0 0 2px currentColor)",
          duration: 3,
          stagger: 0.5,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
        });
      }

      // Add hover animations
      const container = containerRef.current;
      if (container) {
        container.addEventListener("mouseenter", () => {
          const lines = circuitRef.current?.querySelectorAll("line");
          if (lines) {
            gsap.to(lines, {
              strokeWidth: "2",
              filter:
                "drop-shadow(0 0 5px currentColor) drop-shadow(0 0 10px currentColor)",
              duration: 0.3,
              ease: "power2.out",
            });
          }
        });

        container.addEventListener("mouseleave", () => {
          const lines = circuitRef.current?.querySelectorAll("line");
          if (lines) {
            gsap.to(lines, {
              strokeWidth: "1.5",
              filter:
                "drop-shadow(0 0 3px currentColor) drop-shadow(0 0 6px currentColor)",
              duration: 0.3,
              ease: "power2.out",
            });
          }
        });
      }

      // Add electric pulse effect to diagonal lines
      const diagonalLines = circuitRef.current?.querySelectorAll(
        "line[strokeDasharray='141']"
      );
      if (diagonalLines) {
        gsap.to(diagonalLines, {
          strokeDashoffset: -141,
          duration: 4,
          repeat: -1,
          ease: "none",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <Comp ref={containerRef} className={cn("relative", className)}>
      {/* Circuit Board Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main circuit lines */}
        <div className="absolute inset-0 opacity-[0.08]">
          <svg
            ref={circuitRef}
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
                  strokeDasharray="200"
                  strokeDashoffset="0"
                />
                <line
                  x1="0"
                  y1="150"
                  x2="200"
                  y2="150"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-accent"
                  strokeDasharray="200"
                  strokeDashoffset="0"
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
                  strokeDasharray="200"
                  strokeDashoffset="0"
                />
                <line
                  x1="150"
                  y1="0"
                  x2="150"
                  y2="200"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-accent"
                  strokeDasharray="200"
                  strokeDashoffset="0"
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
                  strokeDasharray="141"
                  strokeDashoffset="0"
                />
                <line
                  x1="150"
                  y1="50"
                  x2="50"
                  y2="150"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-accent"
                  strokeDasharray="141"
                  strokeDashoffset="0"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
          </svg>
        </div>

        {/* Animated data flow lines */}
        <div ref={dataFlowRef} className="absolute inset-0 opacity-[0.06]">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent"></div>
          <div
            className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-accent to-transparent"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-accent to-transparent"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-accent to-transparent"
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
