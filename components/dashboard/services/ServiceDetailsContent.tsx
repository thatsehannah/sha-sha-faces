import React from "react";
import ServiceDetail from "./ServiceDetail";
import { Service } from "@prisma/client";
import ServiceDurationDetail from "./ServiceDurationDetail";
import ServicePriceDetail from "./ServicePriceDetail";

type ServiceDetailsContentProps = {
  service: Service;
};

const ServiceDetailsContent = ({ service }: ServiceDetailsContentProps) => {
  return (
    <div className='flex flex-col justify-between bg-muted p-3 rounded-md'>
      <ServiceDetail
        id={service.id}
        data={service.description}
        label='description'
      />
      <div className='flex flex-col xl:flex-row xl:gap-36'>
        <ServiceDurationDetail
          id={service.id}
          duration={service.duration}
        />
        <ServicePriceDetail
          id={service.id}
          price={service.price}
        />
      </div>
    </div>
  );
};

export default ServiceDetailsContent;
