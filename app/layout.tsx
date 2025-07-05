import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  title: 'Save the Date - CodeAndChemistry',
  description: 'Join us on December 6, 2025 as we celebrate the perfect formula of love between a techie and a biochemist.',
  keywords: ['wedding', 'save the date', 'codeandchemistry', 'December 2025', 'wedding invitation', 'love story', 'tech wedding'],
  authors: [{ name: 'Fatima & Pamilerin Wedding' }],
  creator: 'Pamilerin',
  publisher: 'CodeAndChemistry',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Save the Date - CodeAndChemistry',
    description: 'Join us on December 6, 2025 as we celebrate the perfect formula of love between a techie and a biochemist. A wedding where code meets chemistry!',
    siteName: 'Fatima & Pamilerin Wedding',
    images: [
      {
        url: '/api/og-image',
        width: 1200,
        height: 630,
        alt: 'Fatima & Pamilerin Wedding - Save the Date December 6, 2025',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Save the Date - CodeAndChemistry',
    description: 'December 6, 2025 - A celebration of love, code, and chemistry! Join us for our special day.',
    images: ['/api/og-image'],
    creator: '@pamilerinid',
    site: '@pamilerinid',
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  category: 'wedding',
  alternates: {
    canonical: '/',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&family=Yellowtail&family=JetBrains+Mono:wght@300;400;500&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="font-sans antialiased">
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
} 