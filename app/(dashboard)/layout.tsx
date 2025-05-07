import AdminSidebar from "@/components/dashboard/components/AdminSidebar";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import React, { ReactNode } from "react";
import "../globals.css";
import Providers from "../providers";
import { inter } from "@/lib/fonts";
import { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Admin - Sha Sha Faces",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      afterSignOutUrl='/'
      appearance={{ elements: { footer: "hidden" } }}
    >
      <html
        lang='en'
        suppressHydrationWarning
      >
        <body className={`${inter.className}`}>
          <Providers>
            <SidebarProvider>
              <AdminSidebar />
              <SidebarInset>
                <div className='relative'>
                  <div className='absolute top-1 left-1'>
                    <SidebarTrigger />
                  </div>
                  {children}
                </div>
              </SidebarInset>
            </SidebarProvider>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
