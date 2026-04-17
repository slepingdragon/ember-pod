import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EmberPod — The easiest way to start a print-on-demand store",
  description:
    "AI picks what's trending, designs your products, and lists them on Etsy for you. Your first shop, live in 10 minutes.",
  metadataBase: new URL("https://ember-pod.com"),
  openGraph: {
    title: "EmberPod",
    description: "The easiest way to start a print-on-demand store.",
    url: "https://ember-pod.com",
    siteName: "EmberPod",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EmberPod",
    description: "The easiest way to start a print-on-demand store.",
  },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E%E2%97%8F%3C/text%3E%3C/svg%3E",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans relative overflow-x-hidden bg-ink-950 text-white">
        {children}
      </body>
    </html>
  );
}
