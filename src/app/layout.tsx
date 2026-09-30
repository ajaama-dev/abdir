import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const title = `${siteConfig.name} | Premium Plumbing & Heating in ${siteConfig.area}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title,
  description: siteConfig.seo.description,
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "/",
    siteName: siteConfig.name,
    title,
    description: siteConfig.seo.description,
    images: [{ url: siteConfig.seo.heroImage, width: 2000, height: 1333, alt: siteConfig.seo.heroImageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: siteConfig.seo.description,
    images: [siteConfig.seo.heroImage],
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0F1C2E",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
