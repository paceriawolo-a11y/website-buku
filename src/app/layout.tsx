import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nikel Merah Putih — Ihwan Kadir",
  description: "Kedaulatan tidak diberikan. Ia diperjuangkan. Novel fiksi sosial-politik karya Ihwan Kadir tentang tambang nikel, konflik, dan perjuangan rakyat.",
  keywords: ["Nikel Merah Putih", "Ihwan Kadir", "novel Indonesia", "fiksi sosial-politik", "tambang nikel", "eco-fiction"],
  authors: [{ name: "Ihwan Kadir" }],
  icons: {
    icon: "/nikel-merah-putih-cover.png",
  },
  openGraph: {
    title: "Nikel Merah Putih — Ihwan Kadir",
    description: "Kedaulatan tidak diberikan. Ia diperjuangkan.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nikel Merah Putih — Ihwan Kadir",
    description: "Kedaulatan tidak diberikan. Ia diperjuangkan.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
