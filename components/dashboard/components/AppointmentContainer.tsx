'use client';

import React, { useState } from 'react';
import AppointmentGrid from './AppointmentGrid';
import AppointmentTable from './AppointmentTable';
import { Appointment } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { LayoutGrid, Table } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Container from '@/components/global/Container';

type AppointmentContainerProps = {
  appointments: Appointment[];
};

const AppointmentContainer = ({ appointments }: AppointmentContainerProps) => {
  const [view, setView] = useState<'grid' | 'table'>('grid');
  return (
    <Container className='py-20 w-screen lg:w-[80vw]'>
      <div className='flex justify-between items-center '>
        <p className='text-5xl lg:text-7xl font-normal'>Appointments</p>
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
      {view === 'grid' ? (
        <AppointmentGrid appointments={appointments} />
      ) : (
        <AppointmentTable appointments={appointments} />
      )}
    </Container>
  );
};

export default AppointmentContainer;
