import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Service } from '@/utils/types';
import React from 'react';
import ServiceDetailsContent from './ServiceDetailsContent';

type ServiceAccordionProps = {
  service: Service;
};

const ServiceAccordion = ({ service }: ServiceAccordionProps) => {
  return (
    <Accordion
      type='single'
      collapsible
      className='w-full'
    >
      <AccordionItem value={service.name}>
        <AccordionTrigger className='capitalize text-lg font-light'>
          {service.name}
        </AccordionTrigger>
        <AccordionContent>
          <ServiceDetailsContent service={service} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ServiceAccordion;
