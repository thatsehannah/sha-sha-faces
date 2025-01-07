import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/navbar/Navbar';
import { afacadFlux } from '@/lib/fonts';
import PageTransition from '@/components/global/PageTransition';

export const metadata: Metadata = {
  title: 'Sha Sha Faces',
  description: 'MUA out of Los Angeles',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${afacadFlux.className} antialiased`}>
        <Navbar />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
