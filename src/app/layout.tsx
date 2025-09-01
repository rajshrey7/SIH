import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/components/providers/SessionProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "STEM Learning Platform",
  description: "Interactive STEM education platform for rural schools with gamified learning, multilingual content, and offline access.",
  keywords: ["STEM", "Education", "Learning", "Rural Schools", "Gamification", "Multilingual"],
  authors: [{ name: "STEM Learning Team" }],
  openGraph: {
    title: "STEM Learning Platform",
    description: "Empowering students in rural schools with gamified STEM education",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Providers>
          <LanguageProvider>
            {children}
            <Toaster />
          </LanguageProvider>
        </Providers>
      </body>
    </html>
  );
}
