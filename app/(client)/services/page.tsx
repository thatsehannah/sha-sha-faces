import React from 'react';
import services from '@/utils/services.json';
import ServiceDetails from '@/components/services/ServiceDetails';
import Container from '@/components/global/Container';
import SectionTitle from '@/components/global/SectionTitle';

const ServicesPage = () => {
  return (
    <main className='relative'>
      <SectionTitle
        title='services'
        alignment='right'
      />
      <Container className='py-20'>
        {services.map((service, idx) => (
          <ServiceDetails
            key={idx}
            index={idx}
            service={service}
          />
        ))}
      </Container>
    </main>
  );
};

export default ServicesPage;
