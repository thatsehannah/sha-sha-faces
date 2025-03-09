import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { Button } from "../ui/button";
import Container from "../global/Container";

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
        <Container className='flex flex-col gap-6 pt-8'>
          <DrawerHeader className='p-0'>
            <DrawerTitle className='text-4xl tracking-wide font-extrabold'>
              🚨 Please Read Carefully.
            </DrawerTitle>
          </DrawerHeader>
          <div className='flex flex-col gap-8 text-xl font-light'>
            <p>
              Once your appointment is booked, prepare to receive a personal
              text{" "}
              <span className='uppercase text-primary font-bold'>
                requesting a non-refundable
              </span>{" "}
              deposit to secure your appointment. This will go towards your
              service. If a deposit is not received with 3 hours from time of
              request, the appointment will be{" "}
              <span className='text-red-500 font-bold tracking-wider'>
                cancelled
              </span>
              . Location will be provided on the day of service (Hollywood
              area).
            </p>
            <p>
              Appointments booked with less than 2 hours notice will incur a{" "}
              <span className='text-primary font-bold'>$60</span> fee.
            </p>
            <p>
              Appointments before 8am and after 9pm are considered an early/late
              call and will incur a{" "}
              <span className='text-primary font-bold'>$15</span> fee.
            </p>
            <p>
              Please{" "}
              <span className='uppercase font-black tracking-wider'>no</span>{" "}
              extra guests.
            </p>
            <p>
              Cash or electronic payments (CashApp, Zelle, or Apple Pay
              preferred) only upon service.
            </p>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button
                variant='default'
                className='text-xl'
              >
                Confirm
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </Container>
      </DrawerContent>
    </Drawer>
  );
};

export default InstructionsDrawer;
