import type { Metadata } from "next";
import { Anuphan, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { LanguageProvider } from "@/contexts/LanguageContext";
import StatusBar from "@/components/StatusBar";

const kanit = Anuphan({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-kanit",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = "https://worrakan.me";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Worrakan Nasai (Jack) — Full Stack Developer",
    template: "%s · Worrakan.me",
  },
  description:
    "IT Specialist and Full Stack Developer specializing in Python, FastAPI, Django, Next.js and modern web technologies.",
  keywords: [
    "Worrakan Nasai", "วรกันต์ นาไทร", "Jack", "Full Stack Developer",
    "Next.js", "Python", "FastAPI", "Django", "React", "TypeScript", "Portfolio",
  ],
  authors: [{ name: "Worrakan Nasai", url: siteUrl }],
  creator: "Worrakan Nasai",
  alternates: {
    canonical: siteUrl,
    languages: { "en-US": siteUrl, "th-TH": siteUrl },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Worrakan.dev",
    title: "Worrakan Nasai (Jack) — Full Stack Developer",
    description:
      "IT Specialist & Full Stack Developer — Python, FastAPI, Django, Next.js.",
    images: [{ url: "/images/profile.jpg", width: 1200, height: 630, alt: "Worrakan Nasai" }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Worrakan Nasai (Jack) — Full Stack Developer",
    description:
      "IT Specialist & Full Stack Developer — Python, FastAPI, Django, Next.js.",
    images: ["/images/profile.jpg"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${kanit.variable} ${mono.variable} font-kanit antialiased bg-brut-cream text-brut-ink overflow-x-hidden`}
      >
        <LanguageProvider>
          {children}
          <StatusBar />
        </LanguageProvider>
      </body>
    </html>
  );
}