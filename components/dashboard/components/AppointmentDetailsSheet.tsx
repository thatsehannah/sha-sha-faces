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
import { Button } from '@/components/ui/button';
import { getStatusClasses, isDateWithinTwoDays } from '@/lib/utils';
import Link from 'next/link';

type AppointmentDetailProps = {
  data: string;
  label: string;
};

const AppointmentDetail = ({ data, label }: AppointmentDetailProps) => {
  return (
    <div className='flex flex-col gap-1'>
      <p
        data-label={label}
        data-status={data}
        className={`font-bold text-xl data-[label='email']:normal-case capitalize ${getStatusClasses(
          data
        )}`}
      >
        {data}
      </p>
      <p className='font-light text-[1rem] capitalize'>{label}</p>
    </div>
  );
};

type AppointmentDetailsProps = {
  appointment: Appointment;
  children: ReactNode;
};

const AppointmentDetailsSheet = ({
  appointment,
  children,
}: AppointmentDetailsProps) => {
  const isNew = isDateWithinTwoDays(appointment.createdAt);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className='overflow-y-scroll'>
        <SheetHeader className=''>
          <SheetTitle className='text-4xl'>
            {appointment.name}&apos;s Appointment
          </SheetTitle>
          <Separator />
        </SheetHeader>

        <div className='flex flex-col gap-8 my-8'>
          <div className='flex gap-2'>
            <AppointmentDetail
              data={format(appointment.createdAt, 'PPPP')}
              label='appointment created'
            />
            {isNew && (
              <div className='w-12 h-8 text-center bg-lime-200 p-1 rounded-md text-black font-semibold'>
                New
              </div>
            )}
          </div>
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
        <Button
          className='w-full mt-4 text-lg'
          asChild
        >
          <Link href={`/admin/appointments/${appointment.id}`}>
            Edit Appointment
          </Link>
        </Button>
      </SheetContent>
    </Sheet>
  );
};

export default AppointmentDetailsSheet;
