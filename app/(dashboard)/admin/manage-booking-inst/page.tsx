import BookingInstructionsContainer from "@/components/dashboard/manageBookingInst/BookingInstructionsContainer";
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
      <Container className='py-20 w-screen lg:w-[80vw]'>
        <p className='text-5xl font-normal mb-4'>Manage Booking Instructions</p>
        <Separator />
        <BookingInstructionsContainer instructions={instructions} />
      </Container>
    </main>
  );
};

export default AdminManageBookingInstructions;
