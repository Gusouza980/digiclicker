import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { GameProvider } from "@/components/providers/GameProvider";
import { AppShell } from "@/components/layout/AppShell";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Digiclicker",
  description: "Fan game idle/clicker inspirado em Digimon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <GameProvider>
          <AppShell>{children}</AppShell>
        </GameProvider>
      </body>
    </html>
  );
}
