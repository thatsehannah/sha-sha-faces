import React from "react";
import ServiceDetail from "./ServiceDetail";
import { Service } from "@prisma/client";
import ServiceDurationDetail from "./ServiceDurationDetail";

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
      <ServiceDetail
        id={service.id}
        data={service.price}
        label='price'
      />
      <ServiceDurationDetail
        id={service.id}
        duration={`${service.duration}`}
      />
    </div>
  );
};

export default ServiceDetailsContent;
