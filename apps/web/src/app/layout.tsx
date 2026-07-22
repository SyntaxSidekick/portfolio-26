import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/styles/globals.css";
import { SiteShell } from "@/components/site/site-shell";

export const metadata: Metadata = {
  title: "Riad Kilani | Senior Front-End Engineer & UX Engineer",
  description:
    "Accessible, high-performance front-end engineering, UX engineering, design systems, and digital product work.",
  metadataBase: new URL("https://riadkilani.com")
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body data-page="home">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
