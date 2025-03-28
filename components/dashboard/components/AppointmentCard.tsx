import React from "react";
import ServiceIconSvg from "@/components/services/ServiceIconSvg";
import { BadgeCheck, Car, MapPin, User } from "lucide-react";
import AppointmentDetailsSheet from "./AppointmentDetailsSheet";
import { isDateWithinTwoDays } from "@/lib/utils";
import { format } from "date-fns";
import { AppointmentWithService, ServiceSvg } from "@/utils/types";

type AppointmentCardProps = {
  appointment: AppointmentWithService;
};

const AppointmentCard = ({ appointment }: AppointmentCardProps) => {
  const {
    name,
    date,
    time,
    location,
    status,
    createdAt,
    service,
    requiresTravel,
  } = appointment;

  const isNew = isDateWithinTwoDays(createdAt);

  return (
    <>
      <AppointmentDetailsSheet appointment={appointment}>
        <div className='w-full shadow-lg rounded-lg p-6 mb-8 bg-sidebar hover:cursor-pointer hover:-translate-y-4 hover:scale-105 transition-all duration-300 relative border'>
          {isNew && (
            <div className='absolute top-2 right-2 bg-lime-200 p-1 rounded-md text-black text-[12px] font-medium'>
              New
            </div>
          )}
          <div className='flex gap-6 h-full'>
            <div className='w-1/5 hidden xl:flex items-center justify-center p-4 rounded-md bg-secondary border border-black'>
              <ServiceIconSvg
                svg={service.svgData as ServiceSvg}
                className='w-4 h-4 lg:w-16 lg:h-16'
              />
            </div>
            <div className='flex flex-col justify-between gap-8'>
              <div>
                <p className='font-bold text-xl'>
                  <span className='capitalize'>{service.name}</span>
                </p>
                <p className='italic font-light'>
                  {format(date, "PPPP")} at {time}
                </p>
              </div>
              <div className='flex gap-10 text-muted-foreground'>
                <div className='flex flex-col justify-center'>
                  <User className='stroke-muted-foreground' />
                  <p className='lg:text-[16px] font-medium text-tertiary-foreground'>
                    {name}
                  </p>
                </div>
                <div className='flex flex-col justify-center'>
                  <div className='flex gap-3'>
                    <MapPin className='stroke-muted-foreground' />
                    {requiresTravel && (
                      <Car className='stroke-muted-foreground' />
                    )}
                  </div>
                  <p className='lg:text-[16px] font-medium text-tertiary-foreground'>
                    {location}
                  </p>
                </div>
                <div className='flex flex-col justify-center'>
                  <BadgeCheck className='stroke-muted-foreground' />
                  <p
                    data-status={status}
                    className="lg:text-[16px] font-medium data-[status='Pending']:text-orange-400 data-[status='Confirmed']:text-blue-400 data-[status='Completed']:text-green-400 data-[status='Canceled']:text-red-400"
                  >
                    {status}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppointmentDetailsSheet>
    </>
  );
};

export default AppointmentCard;
