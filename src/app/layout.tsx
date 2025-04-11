import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
import LandingNavBar from "../../components/LandingNavBar";
import FloatingButton from "../../components/FloatingButton";
import ThemeRegistry from "./ThemeRegistry";
import { config } from "../utils/config";
import { defaultLocale, getMessages } from "../i18n";
import { LanguageProvider } from "../contexts/LanguageContext";
import { ContactModalProvider } from "../contexts/ContactModalContext";
import { AnalyticsProvider } from "../contexts/AnalyticsContext";
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
  keywords: [
    "drywall",
    "painting",
    "drywall installation",
    "drywall repair",
    "professional painting",
    "commercial painting",
    "residential painting",
    "drywall contractor",
    "painting contractor",
    "local drywall services",
  ],
  authors: [{ name: config.company.name }],
  metadataBase: new URL("https://danysdrywallandpainting.com"),
  openGraph: {
    title: `${config.company.name} | Professional Drywall and Painting Services`,
    description:
      "Quality drywall installation, repair, and painting services for residential and commercial properties.",
    url: "https://danysdrywallandpainting.com",
    siteName: config.company.name,
    images: [
      {
        url: "/img/png/logo_texto.png", // You'll need to add this image
        width: 1200,
        height: 630,
        alt: config.company.name,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://danysdrywallandpainting.com",
  },
};

// JSON-LD structured data for local business
const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": config.company.name,
  "image": "https://danysdrywallandpainting.com/img/png/logo_texto.png",
  "description": "Quality drywall installation, repair, and painting services for residential and commercial properties.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main Street",
    "addressLocality": "Anytown",
    "addressRegion": "CA",
    "postalCode": "12345",
    "addressCountry": "US"
  },
  "telephone": config.contact.phone,
  "email": config.contact.email,
  "url": "https://danysdrywallandpainting.com",
  "priceRange": "$$",
  "sameAs": [
    "https://www.facebook.com/danysdrywallandpainting",
    "https://www.instagram.com/danysdrywallandpainting"
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "18:00"
    }
  ],
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "geoRadius": "50000"
  }
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        suppressHydrationWarning
      >
        <ThemeRegistry>
          <LanguageProvider
            initialLocale={defaultLocale}
            initialMessages={initialMessages}
          >
            <ContactModalProvider>
              <AnalyticsProvider>
                <LandingNavBar />
                <div style={{ width: "100%", margin: "0 auto" }}>
                  {children}
                </div>
                <FloatingButton />
                <ContactModal />
              </AnalyticsProvider>
            </ContactModalProvider>
          </LanguageProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
