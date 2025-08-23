import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import { createClient } from "@/prismicio";
import { JetBrains_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <html lang="es" className={jetBrainsMono.className}>
      <body>
        <Header />
        {children}
        <Footer settings={settings} />
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
