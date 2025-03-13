import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BookingInstructions } from "@prisma/client";
import React from "react";

type BookingInstructionsContainerProps = {
  instructions: BookingInstructions[];
};

const BookingInstructionsContainer = ({
  instructions,
}: BookingInstructionsContainerProps) => {
  return (
    <div className='flex flex-col gap-12 mt-4'>
      {instructions.map((inst, idx) => {
        const label = `Rule ${idx + 1}`;

        return (
          <div
            key={idx}
            className='flex flex-col gap-2'
          >
            <Label>{label}</Label>
            <Textarea defaultValue={inst.rule} />
          </div>
        );
      })}
    </div>
  );
};

export default BookingInstructionsContainer;
