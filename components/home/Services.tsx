import React from 'react';
import Container from '../global/Container';
import services from '@/lib/services.json';
import ServicesCard from './components/ServicesCard';
import SectionTitle from '../global/SectionTitle';
import { Button } from '../ui/button';
import Link from 'next/link';

const Services = () => {
  const popularServices = services.filter((s) => s.popular);

  return (
    <section
      id='services'
      className='relative bg-gradient-to-tr from-background to-primary'
    >
      <SectionTitle
        title='popular services'
        alignment='right'
      />
      <Container className='py-20 flex flex-col justify-center items-center gap-12'>
        <div className='grid grid-cols-1 lg:grid-cols-3 justify-between gap-y-8 gap-x-4'>
          {popularServices.map((service, idx) => {
            return (
              <ServicesCard
                key={idx}
                service={service}
              />
            );
          })}
        </div>
        <Button
          asChild
          size='lg'
          className='bg-primary text-lg'
        >
          <Link href='/services'>View All Services</Link>
        </Button>
      </Container>
    </section>
  );
};

export default Services;
