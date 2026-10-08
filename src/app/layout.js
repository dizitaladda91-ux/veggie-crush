import "./globals.css";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import AnnouncementBar from "../components/layout/announcement-bar";
import { CartProvider } from "../components/cart/cart-provider";
import CartDrawer from "../components/cart/cart-drawer";
import { AuthProvider } from "../components/auth/auth-context";
import AuthModal from "../components/auth/auth-modal";

export const metadata = {
  title: "VeggieCrush — Farm Fresh Organic Harvest & Wellness",
  description: "Fresh farm-picked organic vegetables, wellness herbs, and curated farm boxes delivered directly from local pesticide-free farms.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-white text-[#1E3821]">
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
