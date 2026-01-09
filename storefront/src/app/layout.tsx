import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Raize The Vibe | Premium Streetwear',
    template: '%s | Raize The Vibe',
  },
  description:
    'Premium streetwear that speaks louder than words. Eight pieces. One message. Love people on purpose.',
  keywords: ['streetwear', 'apparel', 'clothing', 'premium', 'family', 'faith'],
  openGraph: {
    title: 'Raize The Vibe | Premium Streetwear',
    description:
      'Premium streetwear that speaks louder than words. Eight pieces. One message. Love people on purpose.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Raize The Vibe',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raize The Vibe | Premium Streetwear',
    description:
      'Premium streetwear that speaks louder than words. Eight pieces. One message. Love people on purpose.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
