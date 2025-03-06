import React from "react";
import ServiceDetail from "./ServiceDetail";
import { Service } from "@prisma/client";

type ServiceDetailsContentProps = {
  service: Service;
};

const ServiceDetailsContent = ({ service }: ServiceDetailsContentProps) => {
  return (
    <div className='flex flex-col justify-between bg-primary p-3 rounded-md'>
      <ServiceDetail
        id={service.id}
        data={service.description}
        label='description'
      />
      <ServiceDetail
        id={service.id}
        data={`$${service.price.toString()}`}
        label='price'
      />
      <ServiceDetail
        id={service.id}
        data={`${service.duration.toString()}`}
        label='duration'
      />
    </div>
  );
};

export default ServiceDetailsContent;
