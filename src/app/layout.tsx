import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import CommandMenu from "@/components/CommandMenu";
import EggLayer from "@/components/eggs/EggLayer";
import { site } from "@/lib/site";

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
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: site.name,
  },
  description: site.description,
  keywords: [
    "Parmeshwar Yadav",
    "portfolio",
    "business analyst",
    "web tools",
    "React",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: site.name,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  email: `mailto:${site.email}`,
  jobTitle: "Business Analyst",
  description: site.description,
  sameAs: [
    site.links.github,
    site.links.linkedin,
    site.links.x,
    site.links.goodreads,
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <Providers>
          <EggLayer />
          <CommandMenu />
          <div className="mx-auto flex min-h-svh max-w-[46rem] flex-col px-6 sm:px-8">
            <Header />
            <main className="grow">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
