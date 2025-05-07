import BookingInstructionsContent from "@/components/dashboard/manageBookingInst/BookingInstructionsContent";
import Container from "@/components/global/Container";
import { Separator } from "@/components/ui/separator";
import { fetchBookingInstructions } from "@/utils/actions";
import { BookingInstructions } from "@prisma/client";
import React from "react";

const AdminManageBookingInstructions = async () => {
  const data = await fetchBookingInstructions();

  let instructions: BookingInstructions[];

  if (data) {
    instructions = data;
  } else {
    return;
  }

  return (
    <main>
      <Container className='py-20 w-screen  flex flex-col gap-4'>
        <p className='text-4xl lg:text-5xl font-normal'>
          Manage Booking Instructions
        </p>
        <Separator />
        <BookingInstructionsContent instructions={instructions} />
      </Container>
    </main>
  );
};

export default AdminManageBookingInstructions;
