import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./features.css";
import "./admin-notifications.css";
import "./support.css";
import Providers from "./provider";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = { title: "HomeServe+ | Expert home services", description: "Book verified professionals for trusted home services." };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers><Suspense fallback={<div className="loading">Loading HomeServe+…</div>}>{children}</Suspense></Providers>
      </body>
    </html>
  );
}
