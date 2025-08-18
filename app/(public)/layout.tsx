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
  keywords: [
    "professional makeup artist",
    "soft glam makeup",
    "bridal makeup services",
    "makeup lessons",
    "travel-friendly makeup services",
    "soothing glam",
    "personalized makeup experience",
    "los angeles makeup artist",
    "california makeup artist",
    "red carpet glam",
    "passionate makeup artist",
    "bridal consultation",
    "virtual makeup lesson",
    "personalized makeup tips & tricks",
  ],
  openGraph: {
    title: "Sha Sha Faces | Professional Makeup Artist",
    description:
      "Expert makeup services for weddings, photoshoots, and special events. Book your appointment today! | Los Angeles Area MUA",
    url: "https://www.shashafaces.com",
    images: [
      {
        url: "https://www.shashafaces.com/open-graph.jpg",
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
    images: ["https://www.shashafaces.com/branding/open-graph.jpg"],
  },
  icons: {
    icon: "../favicon.png",
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
