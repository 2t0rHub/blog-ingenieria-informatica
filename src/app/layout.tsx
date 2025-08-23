import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { createClient } from "@/prismicio";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <html lang="es">
      <body>
        <Header />
        {children}
        <Footer settings={settings} />
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
