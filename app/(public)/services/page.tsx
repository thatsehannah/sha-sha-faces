import React from "react";
import ServiceDetails from "@/components/services/ServiceDetails";
import Container from "@/components/global/Container";
import { fetchAllServices } from "@/utils/actions";
import { RightSectionTitle } from "@/components/global/SectionTitles";

const ServicesPage = async () => {
  const services = await fetchAllServices();

  return (
    <main className='relative'>
      <RightSectionTitle title='services' />
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
