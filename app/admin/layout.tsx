import Container from '@/components/global/Container';
import SectionTitle from '@/components/global/SectionTitle';
import React, { ReactNode } from 'react';

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='relative'>
      <SectionTitle
        title='dashboard'
        alignment='right'
      />
      <section className='py-20'>
        <Container className='grid lg: grid-cols-12 gap-12'>
          <div className='lg:col-span-2'>Sidebar</div>
          <div className='lg:col-span-10'>{children}</div>
        </Container>
      </section>
    </div>
  );
};

export default AdminLayout;
