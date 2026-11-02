import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import CommandMenu from "@/components/CommandMenu";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Parmeshwar Yadav",
  description:
    "Software engineer in Mumbai. Analyst by profession, full-stack by curiosity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${plexMono.variable} min-h-svh antialiased`}
      >
        <Providers>
          <CommandMenu />
          <div className="mx-auto flex min-h-svh max-w-2xl flex-col px-6 sm:px-8">
            <Header />
            <main className="grow">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
