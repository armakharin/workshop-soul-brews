import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Digital Fraud Detective | Command Center",
  description: "Cyberpunk-themed portfolio showcasing expertise in digital fraud investigation and cybersecurity.",
  keywords: ["digital fraud", "cybersecurity", "fraud detection", "investigation", "cyberpunk"],
  authors: [{ name: "Digital Fraud Detective" }],
  openGraph: {
    title: "Digital Fraud Detective | Command Center",
    description: "Cyberpunk-themed portfolio showcasing expertise in digital fraud investigation and cybersecurity.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="cyberpunk-terminal">
        {children}
      </body>
    </html>
  );
}
