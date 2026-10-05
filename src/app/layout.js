import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import AnnouncementBar from "../components/layout/announcement-bar";
import { CartProvider } from "../components/cart/cart-provider";
import CartDrawer from "../components/cart/cart-drawer";
import { AuthProvider } from "../components/auth/auth-context";
import AuthModal from "../components/auth/auth-modal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "VeggieCrush — Farm to Door",
  description: "Fresh farm-picked vegetables, wellness herbs, and curated boxes delivered from our farms to your kitchen.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <CartProvider>
            <AnnouncementBar />
            <Navbar />
            {children}
            <Footer />
            <CartDrawer />
            <AuthModal />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
