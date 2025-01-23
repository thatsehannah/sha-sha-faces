import AdminSidebar from '@/components/dashboard/components/AdminSidebar';
import Container from '@/components/global/Container';
import { SidebarProvider } from '@/components/ui/sidebar';
import React, { ReactNode } from 'react';
import '../globals.css';
import { afacadFlux } from '@/lib/fonts';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
    >
      <body className={`${afacadFlux.className}`}>
        <SidebarProvider>
          <AdminSidebar />
          <main className='relative'>
            <section className='py-20'>
              <Container className='grid lg: grid-cols-12 gap-12'>
                <div className='lg:col-span-10'>{children}</div>
              </Container>
            </section>
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
