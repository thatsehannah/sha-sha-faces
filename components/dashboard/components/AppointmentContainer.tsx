'use client';

import React, { Suspense, useState } from 'react';
import AppointmentGrid from './AppointmentGrid';
import AppointmentTable from './AppointmentTable';
import { Appointment } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { LayoutGrid, Table } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Container from '@/components/global/Container';
import StatusFilterOptions from '../appointments/StatusFilterOptions';
import { useSearchParams } from 'next/navigation';
import SearchFilter from '../appointments/SearchFilter';

type AppointmentContainerProps = {
  appointments: Appointment[];
};

const AppointmentContainer = ({ appointments }: AppointmentContainerProps) => {
  const [view, setView] = useState<'grid' | 'table'>('grid');
  const searchParams = useSearchParams();
  const statusParamValue =
    searchParams.has('status') && searchParams.get('status');
  const searchParamValue =
    searchParams.has('search') && searchParams.get('search');

  if (statusParamValue) {
    appointments = appointments.filter(
      (appt) => appt.status.toLowerCase() === statusParamValue
    );
  }

  if (searchParamValue) {
    appointments = appointments.filter(
      (appt) =>
        appt.email.includes(searchParamValue) ||
        appt.name.includes(searchParamValue)
    );
  }

  return (
    <Container className='py-20 w-screen lg:w-[80vw]'>
      <div className='flex justify-between items-center pb-3'>
        <p className='text-3xl lg:text-5xl font-normal'>Appointments</p>
        <div className='flex gap-2'>
          <Button
            variant='outline'
            size='icon'
            data-display={view}
            className="data-[display='grid']:bg-primary"
            onClick={() => setView('grid')}
          >
            <LayoutGrid />
          </Button>
          <Button
            variant='outline'
            size='icon'
            data-display={view}
            className="data-[display='table']:bg-primary"
            onClick={() => setView('table')}
          >
            <Table />
          </Button>
        </div>
      </div>
      <Separator />
      <div className='mb-8 mt-4 flex items-center lg:gap-8 justify-between lg:justify-normal'>
        <Suspense>
          <StatusFilterOptions />
          <SearchFilter />
        </Suspense>
      </div>
      {view === 'grid' ? (
        <AppointmentGrid appointments={appointments} />
      ) : (
        <AppointmentTable appointments={appointments} />
      )}
    </Container>
  );
};

export default AppointmentContainer;
