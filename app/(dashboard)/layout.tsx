import AdminSidebar from '@/components/dashboard/AdminSidebar';
import Container from '@/components/global/Container';
import SectionTitle from '@/components/global/SectionTitle';
import { SidebarProvider } from '@/components/ui/sidebar';
import React, { ReactNode } from 'react';
import '../globals.css';
import { cabin } from '@/lib/fonts';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
    >
      <body className={`${cabin.className}`}>
        <SidebarProvider>
          <AdminSidebar />
          <main className='relative'>
            <SectionTitle
              title='dashboard'
              alignment='right'
            />
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
