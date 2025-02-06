import VisitorChart from '@/components/dashboard/home/VisitorChart';
import Hero from '@/components/dashboard/home/Hero';
import Overview from '@/components/dashboard/home/Overview';
import Container from '@/components/global/Container';
import React from 'react';

const AdminHomePage = () => {
  return (
    <main>
      <Container className='py-20'>
        <Hero />
        <Overview />
        <VisitorChart />
      </Container>
    </main>
  );
};

export default AdminHomePage;
