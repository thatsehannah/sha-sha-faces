import Hero from '@/components/dashboard/home/Hero';
import Container from '@/components/global/Container';
import React from 'react';

const AdminHomePage = () => {
  return (
    <main>
      <Container className='py-20'>
        <Hero />
      </Container>
    </main>
  );
};

export default AdminHomePage;
