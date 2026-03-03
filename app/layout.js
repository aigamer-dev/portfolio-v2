import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DotMatrixBackground from "@/components/DotMatrixBackground";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://aigamer.dev'),
  title: {
    template: '%s | Hariharan S',
    default: 'Hariharan S | Backend Engineer & AI Enthusiast',
  },
  description: "Portfolio of Hariharan S (AIGAMER) - Member of Technical Staff at Zoho Corp, specializing in Python, DevOps, and GenAI.",
  keywords: ["Hariharan", "Portfolio", "AIGAMER", "pythonanywhere", "Hari", "Haran", "S", "Zoho", "Cyces", "Kavisoftek", "Hindustan", "Python", "28100", "Machine Learning", "Django", "HITS", "Verzeo", "Chennai", "Hariharan S", "DevOps", "GenAI"],
  authors: [{ name: "Hariharan S" }],
  creator: "Hariharan S",
  publisher: "Hariharan S",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Hariharan S | Backend Engineer & AI Enthusiast",
    description: "Portfolio of Hariharan S (AIGAMER) - Member of Technical Staff at Zoho Corp.",
    url: 'https://aigamer.dev',
    siteName: 'AIGAMER Portfolio',
    images: [{ url: 'https://miro.medium.com/fit/c/680/680/1*BfWHdedqBhDbrqwrj4hkUg.png' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Hariharan S | Backend Engineer & AI Enthusiast",
    description: "Portfolio of Hariharan S (AIGAMER) - Member of Technical Staff at Zoho Corp.",
    creator: '@AIGAMER2800',
    images: ['https://miro.medium.com/fit/c/680/680/1*BfWHdedqBhDbrqwrj4hkUg.png'],
  },
  verification: {
    google: 'BLCBxcfjPy-aTrfDc5Sm9Yi5SxOtWqu9ZReIp_JhG5Q',
  },
};

export default function RootLayout({ children }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Hariharan S",
      "url": "https://aigamer.dev",
      "jobTitle": "Member of Technical Staff",
      "worksFor": {
        "@type": "Organization",
        "name": "Zoho Corp"
      },
      "sameAs": [
        "https://www.linkedin.com/in/hariharan-s-aigamer/",
        "https://www.github.com/AIGamer28100",
        "https://twitter.com/AIGAMER2800"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "EmployerAggregateRating",
      "itemReviewed": {
        "@type": "Organization",
        "name": "Hariharan S",
        "url": "https://aigamer.dev"
      },
      "ratingValue": "98",
      "bestRating": "100",
      "worstRating": "1",
      "ratingCount": "50287"
    }
  ];

  return (
    <html lang="en">
      <head>
        <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <DotMatrixBackground />
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
