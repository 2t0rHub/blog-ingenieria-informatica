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
    <nav
      aria-label="Navegación principal"
      className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-8 py-2 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-slate-200 shadow-sm"
    >
      <Link href="/" aria-label="Inicio">
        <div className="hover:scale-105 transition-transform">
          <LogoMark className="w-20 h-20 p-2" />
        </div>
      </Link>

      <ul className="hidden md:flex flex-row items-center gap-6 font-medium text-lg text-slate-700">
        {settings.data.navigation.map((item) => (
          <li key={item.label} className="list-none">
            <PrismicNextLink
              field={item.link}
              className="px-3 py-2 rounded-md hover:text-sky-600 hover:bg-slate-100 transition-colors"
            >
              {item.link.text || "Enlace"}
            </PrismicNextLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
