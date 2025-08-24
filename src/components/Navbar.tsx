"use client";
import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import React, { useState } from "react";
import { X } from "lucide-react";
import LogoMark from "./LogoMark";

type NavBarProps = {
  settings: Content.SettingsDocument;
};

export default function NavBar({ settings }: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className="terminal-window sticky top-4 mx-4 z-50">
        <div className="terminal-header">
          <div className="terminal-controls">
            <div className="terminal-control close"></div>
            <div className="terminal-control minimize"></div>
            <div className="terminal-control maximize"></div>
          </div>
          <div className="terminal-title">2t0rlogs - Navigation</div>
        </div>

        <div className="flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="hover:scale-105 transition-transform">
              <LogoMark className="w-15 h-15 p-1" />
            </div>
            <span className="text-accent font-bold text-xl glow-text font-mono">
              2t0rlogs
            </span>
          </Link>

          <ul className="hidden md:flex items-center gap-1">
            {settings.data.navigation.map((item) => (
              <li key={item.label}>
                <PrismicNextLink
                  field={item.link}
                  className="file-item text-foreground hover:text-accent x-40"
                >
                  <span className="file-icon">/</span>
                  {item.label}
                </PrismicNextLink>
              </li>
            ))}
          </ul>

          {/* Mobile menu button */}
          <button
            className="md:hidden interactive-button"
            onClick={toggleMenu}
            aria-label="Toggle mobile menu"
          >
            <span className="text-accent">{isOpen ? "×" : "≡"}</span>
          </button>
        </div>
      </nav>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Side Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-background border-l border-border z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="terminal-window h-full">
          <div className="terminal-header relative">
            <div className="terminal-controls">
              <div className="terminal-control close"></div>
              <div className="terminal-control minimize"></div>
              <div className="terminal-control maximize"></div>
            </div>
            <div className="terminal-title pr-12">Navigation Menu</div>
            <button
              onClick={closeMenu}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 hover:bg-accent/10 rounded transition-colors duration-200"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-accent" />
            </button>
          </div>

          <div className="p-6">
            <div className="mb-8">
              <Link
                href="/"
                className="flex items-center gap-3 group"
                onClick={closeMenu}
              >
                <div className="hover:scale-105 transition-transform">
                  <LogoMark className="w-12 h-12 p-1" />
                </div>
                <span className="text-accent font-bold text-lg glow-text font-mono">
                  2t0rlogs
                </span>
              </Link>
            </div>

            <nav>
              <ul className="space-y-4">
                {settings.data.navigation.map((item) => (
                  <li key={item.label}>
                    <PrismicNextLink
                      field={item.link}
                      className="file-item text-foreground block py-3 px-4 rounded hover:text-accent"
                      onClick={closeMenu}
                    >
                      <span className="file-icon">/</span>
                      {item.label}
                    </PrismicNextLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
