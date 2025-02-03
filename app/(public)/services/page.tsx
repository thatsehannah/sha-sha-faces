import React from 'react';
import ServiceDetails from '@/components/services/ServiceDetails';
import Container from '@/components/global/Container';
import SectionTitle from '@/components/global/SectionTitle';
import { fetchAllServices } from '@/utils/actions';

const ServicesPage = async () => {
  const services = await fetchAllServices();

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
            index={service.id}
            service={service}
          />
        ))}
      </Container>
    </main>
  );
};

export default ServicesPage;
