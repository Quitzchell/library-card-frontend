import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "@/app/globals.css";
import Navigation from "@/app/_components/navigation/Navigation";
import Footer from "@/app/_components/Footer";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Library Card",
  description: "Library Card",
  robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${ibmPlexMono.variable} flex h-full flex-col antialiased`}
      >
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
