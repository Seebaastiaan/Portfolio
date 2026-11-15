import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const description =
  "Sebastian Jara, software engineer in Mexico City. A portfolio drawn as a single engineering sheet, with every project as a 3D model you can turn.";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-sebas-jara24.vercel.app"),
  title: "Sebastian Jara — Software Engineer",
  description,
  openGraph: {
    title: "Sebastian Jara — Software Engineer",
    description,
    type: "website",
    url: "/",
  },
  icons: {
    icon: "/icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#f3f3ee",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
