import ServiceAccordion from '@/components/dashboard/services/ServiceAccordion';
import Container from '@/components/global/Container';
import { Separator } from '@/components/ui/separator';
import { fetchAllServices } from '@/utils/actions';
import { SquarePlus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const AdminServicesPage = async () => {
  const services = await fetchAllServices();

  return (
    <main>
      <Container className='py-20 w-screen lg:w-[80vw]'>
        <div className='flex gap-4 items-center pb-3'>
          <p className='text-5xl font-normal'>My Services</p>
          <Link
            href='#'
            className='hover:scale-110 transition-all'
          >
            <SquarePlus className='fill-secondary w-10 h-10 stroke-1' />
          </Link>
        </div>
        <Separator />
        {services.map((service, idx) => (
          <ServiceAccordion
            key={idx}
            service={service}
          />
        ))}
      </Container>
    </main>
  );
};

export default AdminServicesPage;
