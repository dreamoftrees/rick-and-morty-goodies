import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from './providers';
import styles from './layout.module.css';
import { Box } from '@chakra-ui/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Web Team Technical Challenge',
  description: 'Leonardo.Ais Web Team Technical Challenge',
  authors: {
    url: 'https://dreamoftrees.com',
    name: 'Charlie McKenzie',
  },
  icons: [{
    url: 'https://leonardo-cdn.b-cdn.net/wp-content/uploads/2022/12/cropped-fav-leonardo-logo-32x32.png',
    sizes: '32x32',
  }, {
    url: 'https://leonardo-cdn.b-cdn.net/wp-content/uploads/2022/12/cropped-fav-leonardo-logo-192x192.png',
    sizes: '192x192',
  }],
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
    <body className={inter.className}>
        <Box className={styles.background} />
        <Providers>
          {children}
        </Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
