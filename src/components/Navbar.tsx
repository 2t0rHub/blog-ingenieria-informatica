import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import React from "react";
import LogoMark from "./LogoMark";

type NavBarProps = {
  settings: Content.SettingsDocument;
};

export default function NavBar({ settings }: NavBarProps) {
  return (
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
                className="file-item text-foreground hover:text-accent"
              >
                <span className="file-icon">📁</span>
                {item.label}
              </PrismicNextLink>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button className="md:hidden interactive-button">
          <span className="text-accent">≡</span>
        </button>
      </div>
    </nav>
  );
}
