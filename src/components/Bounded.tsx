"use client";
import React, { useEffect, useRef, useState } from "react";
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
  withPadding = false,
}: BoundedProps) {
  const containerRef = useRef<HTMLElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);

  const [chars, setChars] = useState<
    {
      char: string;
      x: number;
      y: number;
      size: number;
      rotate: number;
      animate: boolean;
    }[]
  >([]);

  const sizeClasses = {
    sm: "max-w-4xl",
    md: "max-w-5xl",
    lg: "max-w-6xl",
    xl: "max-w-7xl",
  };

  // Generar caracteres aleatorios solo en cliente
  useEffect(() => {
    const possibleChars = "2t0rlogs@#$%&*";
    const newChars = Array.from({ length: 80 }, () => ({
      char: possibleChars[Math.floor(Math.random() * possibleChars.length)],
      x: Math.random() * 100, // porcentaje
      y: Math.random() * 100, // porcentaje
      size: 10 + Math.random() * 12, // tamaño en px
      rotate: (Math.random() - 0.5) * 20, // rotación entre -10 y 10 grados
      animate: Math.random() < 0.2, // solo ~20% de los caracteres animados
    }));
    setChars(newChars);
  }, []);

  // Animación sutil solo en algunos caracteres
  useEffect(() => {
    const animatedChars = charsRef.current.filter((_, i) => chars[i]?.animate);
    if (!animatedChars.length) return;

    gsap.to(animatedChars, {
      opacity: 0.2,
      scale: 1.2,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: { each: 0.2, from: "random" },
    });
  }, [chars]);

  return (
    <Comp
      ref={containerRef}
      className={cn(
        "relative bg-black text-green-400 overflow-hidden",
        className
      )}
    >
      {/* Fondo de caracteres aleatorios */}
      <div className="absolute  bg-black/10 backdrop-blur-sm inset-0 w-full h-full pointer-events-none">
        {chars.map((c, i) => (
          <span
            key={`char-${i}`}
            ref={(el: any) => el && (charsRef.current[i] = el)}
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
