import ServiceAccordion from "@/components/dashboard/services/ServiceAccordion";
import Container from "@/components/global/Container";
import { Separator } from "@/components/ui/separator";
import { fetchAllServices } from "@/utils/actions";
import { SquarePlus } from "lucide-react";
import Link from "next/link";
import React from "react";

const AdminServicesPage = async () => {
  const services = await fetchAllServices();

  return (
    <main>
      <Container className='py-20 w-screen lg:w-[80vw] flex flex-col gap-4'>
        <div className='flex gap-4 items-center'>
          <p className='text-4xl lg:text-5xl font-normal'>My Services</p>
          <Link
            href='/admin/services/new'
            className='hover:scale-110 transition-all'
          >
            <SquarePlus className='fill-secondary w-10 h-10 stroke-1 stroke-black' />
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
