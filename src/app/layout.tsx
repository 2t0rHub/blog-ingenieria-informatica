import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        {/* Missing Header */}
        {children}
        {/* Missing Footer */}
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
