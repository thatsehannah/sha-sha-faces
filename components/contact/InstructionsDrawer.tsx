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
  bookingInstructions: string[];
};

const InstructionsDrawer = ({
  open,
  onOpenChange,
  bookingInstructions,
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
            {bookingInstructions?.map((rule, idx) => (
              <p key={idx}>{rule}</p>
            ))}
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
