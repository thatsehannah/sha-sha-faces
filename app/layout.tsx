import type { Metadata } from 'next';
import { Cabin } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar/Navbar';
import Container from '@/components/global/Container';

const cabin = Cabin({
  subsets: ['latin'],
  display: 'swap',
});

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
      <body className={`${cabin.className} antialiased`}>
        <Navbar />
        <Container className='py-20'>{children}</Container>
      </body>
    </html>
  );
}
