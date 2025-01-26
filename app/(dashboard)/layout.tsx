import AdminSidebar from '@/components/dashboard/components/AdminSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import React, { ReactNode } from 'react';
import '../globals.css';
import Providers from '../providers';
import { inter } from '@/lib/fonts';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
    >
      <body className={`${inter.className}`}>
        <Providers>
          <SidebarProvider>
            <AdminSidebar />
            <>
              <SidebarTrigger />
              {children}
            </>
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}
