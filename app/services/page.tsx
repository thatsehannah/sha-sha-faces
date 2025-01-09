import React from 'react';
import services from '@/lib/services.json';
import ServiceDetails from '@/components/services/ServiceDetails';

const ServicesPage = () => {
  return (
    <div>
      {services.map((service, idx) => (
        <ServiceDetails
          key={idx}
          service={service}
        />
      ))}
    </div>
  );
};

export default ServicesPage;
