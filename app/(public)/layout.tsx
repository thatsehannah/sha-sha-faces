import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/navbar/Navbar";
import { cormorant } from "@/lib/fonts";
import Providers from "../providers";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Sha Sha Faces",
  description: "MUA out of Los Angeles",
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
