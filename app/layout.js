import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DotMatrixBackground from "@/components/DotMatrixBackground";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
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
    images: [{ url: '/favicon.ico' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: "Hariharan S | Backend Engineer & AI Enthusiast",
    description: "Portfolio of Hariharan S (AIGAMER) - Member of Technical Staff at Zoho Corp.",
    creator: '@AIGAMER2800',
    images: ['/favicon.ico'],
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
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://aigamer.dev"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Projects",
          "item": "https://aigamer.dev/projects"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Updates",
          "item": "https://aigamer.dev/updates"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Awards",
          "item": "https://aigamer.dev/awards"
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "SiteNavigationElement",
      "name": ["Home", "Projects", "Updates", "Awards", "Contact"],
      "url": ["https://aigamer.dev", "https://aigamer.dev/projects", "https://aigamer.dev/updates", "https://aigamer.dev/awards", "https://aigamer.dev/contact"]
    }
  ];

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="preload" href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" as="style" />
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
