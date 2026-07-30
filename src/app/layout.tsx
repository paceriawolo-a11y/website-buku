import type { Metadata } from "next";
import "./globals.css";

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
      <body className="antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
