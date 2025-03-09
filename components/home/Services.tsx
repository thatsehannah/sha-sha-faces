import React from "react";
import Container from "../global/Container";
import ServicesCard from "./components/ServicesCard";
import { Button } from "../ui/button";
import Link from "next/link";
import { fetchPopularServices } from "@/utils/actions";
import RightSectionTitle from "../global/RightSectionTitle";

const Services = async () => {
  const popularServices = await fetchPopularServices();

  return (
    <section
      id='services'
      className='relative bg-gradient-to-l from-primary to-background'
    >
      <RightSectionTitle
        title='popular services'
        className='text-primary-foreground'
      />
      <Container className='py-20 flex flex-col justify-center items-center gap-12'>
        <div className='grid grid-cols-1 lg:grid-cols-3 justify-between gap-y-8 gap-x-4'>
          {popularServices.map((service) => {
            return (
              <ServicesCard
                key={service.id}
                service={service}
              />
            );
          })}
        </div>
        <Button
          asChild
          size='lg'
          className='bg-primary text-primary-foreground text-lg'
        >
          <Link href='/services'>View All Services</Link>
        </Button>
      </Container>
    </section>
  );
};

export default Services;
