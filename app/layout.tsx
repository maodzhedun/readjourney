//app/layout.tsx

import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Providers from './providers';
import AuthProvider from '@/components/AuthProvider/AuthProvider';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  ),
  title: {
    default: 'Read Journey — Your Personal Reading Tracker',
    template: '%s | Read Journey',
  },
  description:
    'Track your reading progress, discover new books, and build your personal library. Start your reading journey today!',
  keywords: [
    'reading tracker',
    'book tracker',
    'reading progress',
    'personal library',
    'reading goals',
    'book diary',
  ],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  publisher: 'Read Journey',
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
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Read Journey',
    title: 'Read Journey — Your Personal Reading Tracker',
    description:
      'Track your reading progress, discover new books, and build your personal library.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Read Journey - Reading Tracker',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Read Journey — Your Personal Reading Tracker',
    description:
      'Track your reading progress, discover new books, and build your personal library.',
    images: ['/images/og-image.png'],
    creator: '@your_twitter',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#141414',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-[#141414] font-sans text-[#f9f9f9] antialiased">
        <Providers>
          <AuthProvider>{children}</AuthProvider>
        </Providers>
      </body>
    </html>
  );
}