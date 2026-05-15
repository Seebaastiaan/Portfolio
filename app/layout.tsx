import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sebastian Jara — Software Engineer",
  description:
    "Sebastian Jara — Software Engineer. Type-driven, architectural product interfaces.",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="bg-canvas-parchment text-cocoa-ink antialiased">
        {children}
      </body>
    </html>
  );
}
