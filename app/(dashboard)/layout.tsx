import AdminSidebar from '@/components/dashboard/components/AdminSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import React, { ReactNode } from 'react';
import '../globals.css';
import Providers from '../providers';
import { afacadFlux } from '@/lib/fonts';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
    >
      <body className={`${afacadFlux.className}`}>
        <Providers>
          <SidebarProvider>
            <AdminSidebar />
            {children}
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}
