import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Save the Date - CodeAndChemistry',
  description: 'Join us on December 6, 2025 as we celebrate the perfect formula of love between a techie and a biochemist.',
  keywords: ['wedding', 'save the date', 'codeandchemistry', 'December 2025'],
  authors: [{ name: 'CodeAndChemistry Wedding' }],
  openGraph: {
    title: 'Save the Date - CodeAndChemistry',
    description: 'December 6, 2025 - A celebration of love, code, and chemistry',
    type: 'website',
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