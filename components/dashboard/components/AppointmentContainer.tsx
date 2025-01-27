'use client';

import React, { Suspense, useState } from 'react';
import AppointmentGrid from './AppointmentGrid';
import AppointmentTable from './AppointmentTable';
import { Appointment } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { LayoutGrid, Table } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Container from '@/components/global/Container';
import FilterOptions from '../appointments/FilterOptions';
import { useSearchParams } from 'next/navigation';

type AppointmentContainerProps = {
  appointments: Appointment[];
};

const AppointmentContainer = ({ appointments }: AppointmentContainerProps) => {
  const [view, setView] = useState<'grid' | 'table'>('grid');
  const searchParams = useSearchParams();
  const paramValue = searchParams.has('f') && searchParams.get('f');

  if (paramValue) {
    appointments = appointments.filter(
      (appt) => appt.status.toLowerCase() === paramValue
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
      <div className='mb-8 mt-4 flex items-center gap-4'>
        <Suspense>
          <FilterOptions />
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
