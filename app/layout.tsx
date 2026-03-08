import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sebastian Jara | Product Engineer",
  description:
    "Building interfaces that feel inevitable. Product engineer crafting experiences at the intersection of design and engineering.",
  icons: {
    icon: "/icon.png", // Place your icon in the /public folder
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
