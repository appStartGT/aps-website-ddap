import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LandingNavBar from "../../components/LandingNavBar";
import FloatingButton from "../../components/FloatingButton";
import ThemeRegistry from "./ThemeRegistry";
import { config } from "../utils/config";
import { defaultLocale, getMessages } from "../i18n";
import { LanguageProvider } from "../contexts/LanguageContext";
import { ContactModalProvider } from "../contexts/ContactModalContext";
import ContactModal from "../../components/ContactModal";
// Add this import
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${config.company.name} | Professional Drywall and Painting Services`,
  description: `Quality drywall installation, repair, and painting services for residential and commercial properties. Expert craftsmanship and attention to detail.`,
  keywords: ["drywall", "painting", "drywall installation", "drywall repair", "professional painting", "commercial painting", "residential painting"],
  authors: [{ name: config.company.name }],
  metadataBase: new URL('https://danysdrywallandpainting.com'),
  openGraph: {
    title: `${config.company.name} | Professional Drywall and Painting Services`,
    description: "Quality drywall installation, repair, and painting services for residential and commercial properties.",
    url: "https://danysdrywallandpainting.com",
    siteName: config.company.name,
    images: [
      {
        url: "/img/og-image.jpg", // You'll need to add this image
        width: 1200,
        height: 630,
        alt: config.company.name,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Pre-load the default language messages for SSR
  const initialMessages = await getMessages(defaultLocale);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
        <ThemeRegistry>
          <LanguageProvider initialLocale={defaultLocale} initialMessages={initialMessages}>
            <ContactModalProvider>
              <LandingNavBar />
              <div style={{ width: "100%", margin: "0 auto" }}>
                {children}
              </div>
              <FloatingButton />
              <ContactModal />
            </ContactModalProvider>
          </LanguageProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
