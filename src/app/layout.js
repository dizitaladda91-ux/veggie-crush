import "./globals.css";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import AnnouncementBar from "../components/layout/announcement-bar";
import { CartProvider } from "../components/cart/cart-provider";
import CartDrawer from "../components/cart/cart-drawer";
import { AuthProvider } from "../components/auth/auth-context";
import AuthModal from "../components/auth/auth-modal";
import PageTransition from "../components/layout/page-transition";
import WelcomeLoader from "../components/homepage/welcome-loader";

export const metadata = {
  title: "VeggieCrush – Pure Vegetable & Herb Powders | 200 g",
  description:
    "Shop VeggieCrush beetroot, moringa, amla, turmeric, giloy powders and EverFit. Machine-dried, finely ground, easy to mix.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=Manrope:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-[#1E3821]">
        <AuthProvider>
          <CartProvider>
            <WelcomeLoader />
            <AnnouncementBar />
            <Navbar />
            <PageTransition>{children}</PageTransition>
            <Footer />
            <CartDrawer />
            <AuthModal />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
