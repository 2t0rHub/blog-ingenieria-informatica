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
  withPadding = false,
}: BoundedProps) {
  // Generar caracteres aleatorios en el servidor
  const possibleChars = "2t0rlogs@#$%&*";
  const chars = Array.from({ length: 80 }, () => ({
    char: possibleChars[Math.floor(Math.random() * possibleChars.length)],
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 10 + Math.random() * 12,
    rotate: (Math.random() - 0.5) * 20,
  }));

  const sizeClasses = {
    sm: "max-w-4xl",
    md: "max-w-5xl",
    lg: "max-w-6xl",
    xl: "max-w-7xl",
  };

  return (
    <Comp
      className={cn(
        "relative bg-black text-green-400 overflow-hidden",
        className
      )}
    >
      {/* Fondo de caracteres aleatorios */}
      <div className="absolute bg-black/10 backdrop-blur-sm inset-0 w-full h-full pointer-events-none">
        {chars.map((c, i) => (
          <span
            key={`char-${i}`}
            className="absolute"
            style={{
              left: `${c.x}%`,
              top: `${c.y}%`,
              fontSize: `${c.size}px`,
              lineHeight: 1,
              opacity: 0.3,
              fontFamily: "monospace",
              transform: `rotate(${c.rotate}deg)`,
            }}
          >
            {c.char}
          </span>
        ))}
      </div>

      {/* Contenido */}
      <div
        className={cn(
          "relative mx-auto",
          sizeClasses[size],
          withPadding && "px-4 md:px-6"
        )}
      >
        {children}
      </div>
    </Comp>
  );
}
