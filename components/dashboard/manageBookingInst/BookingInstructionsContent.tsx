"use client";

import { BookingInstructions } from "@prisma/client";
import React, { useState } from "react";
import BookingInstructionsDetail from "./BookingInstructionsDetail";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createBookingInstruction } from "@/utils/actions";
import { useToast } from "@/hooks/use-toast";

type BookingInstructionsContentProps = {
  instructions: BookingInstructions[];
};

const BookingInstructionsContent = ({
  instructions,
}: BookingInstructionsContentProps) => {
  const { toast } = useToast();
  const [isAddingNewRule, setIsAddingNewRule] = useState(false);
  const [newRule, setNewRule] = useState("");

  const saveNewRule = async () => {
    try {
      const resultMessage = await createBookingInstruction(newRule);

      toast({
        variant: "success",
        description: resultMessage,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description:
          error instanceof Error ? error.message : "An error occurred ",
      });
    }
  };

  return (
    <div className='flex flex-col'>
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
      {isAddingNewRule && (
        <div className='flex flex-col gap-2 my-12'>
          <Label
            htmlFor='newRule'
            className='text-xl mr-6 font-extrabold underline'
          >
            New Rule
          </Label>
          <Textarea
            id='newRule'
            value={newRule}
            onChange={(e) => setNewRule(e.target.value)}
          />
          <div
            data-disabled={!isAddingNewRule}
            className='flex gap-2 data-[disabled="true"]:invisible'
          >
            <Button
              variant='secondary'
              className='text-secondary-foreground'
              onClick={() => {
                setIsAddingNewRule(false);
                saveNewRule();
              }}
              disabled={newRule === ""}
            >
              Save
            </Button>
            <Button
              variant='outline'
              onClick={() => {
                setIsAddingNewRule(false);
                setNewRule("");
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
      <div className='mt-10'>
        <Button
          className='w-auto data-[disabled="true"]:invisible'
          data-disabled={isAddingNewRule}
          onClick={() => setIsAddingNewRule(true)}
        >
          <Plus />
          Add New Rule
        </Button>
      </div>
    </div>
  );
};

export default BookingInstructionsContent;
