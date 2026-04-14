import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agamya Eduventure | Premium Coding Education",
  description:
    "Agamya Eduventure offers a premium, modern coding education experience with structured mentoring, practical programs, and confidence-building guidance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
