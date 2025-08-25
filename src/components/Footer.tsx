import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { Mail, Github, Linkedin, Instagram } from "lucide-react";
import Link from "next/link";
import React from "react";
import LogoMark from "./LogoMark";

const icons = {
  github: <Github />,
  linkedin: <Linkedin />,
  mail: <Mail />,
  instagram: <Instagram />,
};

type FooterProps = {
  settings: Content.SettingsDocument;
};

export default function Footer({ settings }: FooterProps) {
  return (
    <footer className="mt-auto">
      <div className="terminal-window mx-4 mb-4">
        <div className="terminal-header">
          <div className="terminal-controls">
            <div className="terminal-control close"></div>
            <div className="terminal-control minimize"></div>
            <div className="terminal-control maximize"></div>
          </div>
          <div className="terminal-title">2t0rlogs - System Footer</div>
        </div>

        <div className="p-6">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="hover:scale-105 transition-transform">
                  <LogoMark className="w-12 h-12 p-1" />
                </div>
                <span className="text-accent font-bold text-xl glow-text font-mono">
                  2t0rlogs
                </span>
              </Link>
              <p className="text-foreground/70 text-sm font-mono leading-relaxed">
                Exploring the digital frontier through code, creativity, and
                innovation. Your gateway to the future of technology.
              </p>
            </div>

            {/* Navigation Section */}
            <div className="space-y-4">
              <h3 className="text-accent font-bold text-lg font-mono border-b border-accent/30 pb-2">
                Navigation
              </h3>
              <nav>
                <ul className="space-y-2">
                  {settings.data.navigation.map((item) => (
                    <li key={item.label}>
                      <PrismicNextLink
                        field={item.link}
                        className="flex file-item text-foreground/80 hover:text-accent transition-colors duration-200 py-1"
                      >
                        <span className="file-icon">{">"}</span>
                        {item.label}
                      </PrismicNextLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Quick Links Section */}
            <div className="space-y-4">
              <h3 className="text-accent font-bold text-lg font-mono border-b border-accent/30 pb-2">
                Socials
              </h3>
              <ul className="space-y-2">
                {settings.data.socials &&
                  settings.data.socials.map(
                    (item, index) =>
                      item && (
                        <li key={index}>
                          <div className="flex file-item text-foreground/80 hover:text-accent transition-colors duration-200 py-1">
                            <span className="file-icon">{"> "}</span>
                            <PrismicNextLink field={item.link} />
                            <>{item.icon && icons[item.icon]}</>
                          </div>
                        </li>
                      )
                  )}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-foreground/60 text-sm font-mono">
                © 2024 2t0rlogs. All rights reserved.
              </div>
              <div className="flex items-center gap-6 text-sm font-mono">
                <span className="text-foreground/60">Status: </span>
                <span className="text-green-400 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Online
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
