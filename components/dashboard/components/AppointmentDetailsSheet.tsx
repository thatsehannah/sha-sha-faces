import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Appointment } from '@prisma/client';
import { format } from 'date-fns';
import React, { ReactNode } from 'react';
import AppointmentDetail from './AppointmentDetail';
import { Button } from '@/components/ui/button';

type AppointmentDetailsProps = {
  appointment: Appointment;
  children: ReactNode;
};

const AppointmentDetailsSheet = ({
  appointment,
  children,
}: AppointmentDetailsProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className='overflow-y-scroll'>
        <SheetHeader className='mb-8'>
          <SheetTitle className='text-4xl'>
            {appointment.name}&apos;s Appointment
          </SheetTitle>
          <Separator />
        </SheetHeader>
        <div className='flex flex-col gap-8'>
          <AppointmentDetail
            data={format(appointment.createdAt, 'PPPP')}
            label='appointment created'
          />
          <AppointmentDetail
            data={appointment.status}
            label='status'
          />
          <AppointmentDetail
            data={appointment.service}
            label='service'
          />
          <AppointmentDetail
            data={format(appointment.date, 'PPPP')}
            label='date'
          />
          <AppointmentDetail
            data={appointment.time}
            label='time of appointment'
          />
          <AppointmentDetail
            data={appointment.location}
            label='location'
          />
          <AppointmentDetail
            data={appointment.email}
            label='email'
          />
          <AppointmentDetail
            data={appointment.discovery}
            label='how client discovered me'
          />
        </div>
        <Separator />
        <Button className='w-full mt-4 text-lg'>Edit Appointment</Button>
      </SheetContent>
    </Sheet>
  );
};

export default AppointmentDetailsSheet;
