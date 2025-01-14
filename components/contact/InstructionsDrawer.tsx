import React from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '../ui/drawer';
import { Button } from '../ui/button';
import Container from '../global/Container';

type InstructionsDrawerProps = {
  open: boolean;
  onOpenChange: () => void;
};

const InstructionsDrawer = ({
  open,
  onOpenChange,
}: InstructionsDrawerProps) => {
  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
    >
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className='text-4xl tracking-wide font-extrabold text-secondary'>
            Please Read Carefully
          </DrawerTitle>
        </DrawerHeader>
        <Container className='flex flex-col gap-6 p-4 text-2xl'>
          <p>
            Once your appointment is booked, prepare to receive a personal text
            REQUESTING A NON-REFUNDABLE deposit to secure your appointment. This
            will go towards your service. If a deposit is not received with 3
            hours of time of request, the appointment will be cancelled.
            Location will be provided on the day of service (Hollywood area).
          </p>
          <p>Please no extra guests.</p>
          <p>
            Cash or electronic payments (CashApp, Zelle, or Apple Pay preferred)
            only upon service.
          </p>
        </Container>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant='outline'>Confirm</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default InstructionsDrawer;
