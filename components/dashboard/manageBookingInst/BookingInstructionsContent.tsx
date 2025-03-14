import { BookingInstructions } from "@prisma/client";
import React from "react";
import BookingInstructionsDetail from "./BookingInstructionsDetail";

type BookingInstructionsContentProps = {
  instructions: BookingInstructions[];
};

const BookingInstructionsContent = ({
  instructions,
}: BookingInstructionsContentProps) => {
  return (
    <div className='flex flex-col gap-10 mt-4'>
      {instructions.map((inst, idx) => (
        <BookingInstructionsDetail
          key={idx}
          rule={inst.rule}
          index={idx}
          id={inst.id}
        />
      ))}
    </div>
  );
};

export default BookingInstructionsContent;
