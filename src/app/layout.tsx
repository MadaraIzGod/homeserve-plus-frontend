import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./features.css";
import "./admin-notifications.css";
import "./support.css";
import Providers from "./provider";
import { Suspense } from "react";
import DynamicLoading from "@/components/DynamicLoading";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: {
    default: "HomeServe+ | On-Demand Expert Home Services & Repairs",
    template: "%s | HomeServe+",
  },
  description:
    "Book trusted, verified professionals for AC repair, plumbing, cleaning, electrical work, painting, and beauty services. Fast, transparent, and reliable home care.",
  keywords: [
    "home services",
    "on demand house repair",
    "verified professionals",
    "AC repair service",
    "plumbing services",
    "electrician near me",
    "home cleaning services",
    "appliance repair",
    "carpenter services",
    "pest control",
    "salon at home",
    "HomeServe+",
  ],
  authors: [{ name: "HomeServe+" }],
  creator: "HomeServe+",
  publisher: "HomeServe+",
  metadataBase: new URL("homeserve-plus-frontend.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "HomeServe+ | On-Demand Expert Home Services & Repairs",
    description:
      "Book verified professionals for AC repair, plumbing, cleaning, electrical work, and more with guaranteed quality service.",
    url: "homeserve-plus-frontend.vercel.app",
    siteName: "HomeServe+",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "HomeServe+ On-Demand Home Services Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HomeServe+ | Trusted Professional Home Services",
    description:
      "Instant booking for house cleaning, repairs, electrical, plumbing, and home maintenance.",
    images: ["/logo.png"],
    creator: "@homeserveplus",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <Suspense
            fallback={<DynamicLoading/>}
          >
            {children}
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
