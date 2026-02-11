import type { Metadata } from "next";
import { Inter, Outfit, Rajdhani, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Preloader } from "@/components/layout/preloader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LumenNode - Premium VPS & Minecraft Hosting",
  description: "High-performance hosting solutions with 99.9% uptime. Managed Minecraft, VPS, and Dedicated servers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${rajdhani.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased bg-background text-foreground font-sans selection:bg-primary/30 selection:text-primary-foreground">
        <Preloader />
        {children}
      </body>
    </html>
  );
}
