import type { Metadata } from "next";
import { Anuphan } from "next/font/google";
import "./globals.css";

import Footer from "@/components/Footer";
import GalaxyBackground from "@/components/GalaxyBackground";
import ParticlesBackground from "@/components/ParticlesBackground";
import { LanguageProvider } from "@/contexts/LanguageContext";

const kanit = Anuphan({
  subsets: ["thai", "latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-kanit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Worrakan Nasai - Full Stack Developer",
  description: "IT Specialist and Full Stack Developer specializing in Python, FastAPI, Django and modern web technologies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${kanit.variable} font-kanit antialiased bg-black text-white overflow-x-hidden`}
      >
        <LanguageProvider>
          <div className="min-h-screen relative">
            <GalaxyBackground />
            <ParticlesBackground />
            <main className="flex-grow relative z-10">
              {children}
            </main>
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}