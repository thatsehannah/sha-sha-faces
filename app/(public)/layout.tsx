import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/navbar/Navbar";
import { cormorant } from "@/lib/fonts";
import Providers from "../providers";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Sha Sha Faces | Professional Makeup Artist",
  description:
    "Expert makeup services for weddings, photoshoots, and special events. Book your appointment today! | Los Angeles Area MUA",
  openGraph: {
    title: "Sha Sha Faces | Professional Makeup Artist",
    description:
      "Expert makeup services for weddings, photoshoots, and special events. Book your appointment today! | Los Angeles Area MUA",
    url: "https://www.shashafaces.com",
    images: [
      {
        url: "https://www.shashafaces.com/branding/logo-color.png",
        width: 1200,
        height: 630,
        alt: "Sha Sha Faces makeup artist at work",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sha Sha Faces | Professional Makeup Artist",
    description:
      "Expert makeup services for weddings, photoshoots, and special events. Book your appointment today! | Los Angeles Area MUA",
    images: ["https://www.shashafaces.com/branding/logo-color.png"],
  },
  icons: {
    icon: "../favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      afterSignOutUrl='/'
      appearance={{ elements: { footer: "hidden" } }}
    >
      <html
        lang='en'
        suppressHydrationWarning
      >
        <body className={`${cormorant.className} antialiased`}>
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
