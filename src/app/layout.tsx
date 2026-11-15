import type { Metadata, Viewport } from "next";
import { Cabin, Alfa_Slab_One, Playfair_Display, Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

// Fonts via next/font/google (No <link> tags)
const cabin = Cabin({
  subsets: ["latin"],
  weight: ["800"],
  variable: "--font-heading",
  display: "swap",
});

const alfaSlabOne = Alfa_Slab_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-badge",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400", "600", "700"],
  variable: "--font-tagline",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1B5E14",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://veggiecrush.in"),
  title: {
    default: "Pure VeggieCrush™ | Nature, Nothing Else.",
    template: "%s | Pure VeggieCrush",
  },
  description:
    "100% natural, cold-crushed vegetable and fruit powders & wellness elixirs. Zero preservatives, zero added sugar, packaged in airtight 200g glass jars straight from our certified organic farms.",
  keywords: [
    "Pure VeggieCrush",
    "organic vegetable powder",
    "beetroot powder",
    "moringa superleaf",
    "amla powder",
    "natural juices",
    "cold crushed superfoods",
    "zero preservative nutrition",
  ],
  authors: [{ name: "Pure VeggieCrush Organics" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://veggiecrush.in",
    siteName: "Pure VeggieCrush",
    title: "Pure VeggieCrush™ | Nature, Nothing Else.",
    description:
      "Cold-crushed raw vegetable and superfood powders. Fresh dawn harvest delivered in reusable 200g glass jars across India.",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Pure VeggieCrush - Nature, Nothing Else",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pure VeggieCrush™ | Nature, Nothing Else.",
    description: "Pure farm-crushed vegetable and herbal botanicals with zero preservatives.",
    images: ["/images/logo.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cabin.variable} ${alfaSlabOne.variable} ${playfairDisplay.variable} ${openSans.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-white text-brand-ink font-body antialiased selection:bg-brand-orange/20 selection:text-brand-green">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
