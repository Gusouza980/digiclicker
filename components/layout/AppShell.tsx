"use client";

import { Header } from "./Header";
import { Navigation } from "./Navigation";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg-primary)]">
      <Header />
      <Navigation />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">{children}</main>
    </div>
  );
}
