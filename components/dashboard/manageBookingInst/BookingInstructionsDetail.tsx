"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  deleteBookingInstruction,
  saveBookingInstruction,
} from "@/utils/actions";
import { Pencil, Trash } from "lucide-react";
import React, { useState } from "react";

type BookingInstructionsDetailProps = {
  rule: string;
  id: string;
  index: number;
};

const BookingInstructionsDetail = ({
  rule,
  index,
  id,
}: BookingInstructionsDetailProps) => {
  const [text, setText] = useState(rule);
  const [isEditing, setIsEditing] = useState(false);
  const [openConfrimDialog, setOpenConfirmDialog] = useState(false);
  const { toast } = useToast();
  const label = `Rule #${index + 1}`;

  const saveRule = async () => {
    try {
      const resultMessage = await saveBookingInstruction(id, text);

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

  const deleteRule = async () => {
    try {
      const resultMessage = await deleteBookingInstruction(id);

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
    <div className='flex flex-col gap-2'>
      <div className='flex items-center gap-3'>
        <Label
          htmlFor={id.toString()}
          className='text-xl mr-6 font-medium'
        >
          {label}
        </Label>{" "}
        <Button
          size='icon'
          className='bg-blue-500 hover:bg-blue-500/90'
          onClick={() => setIsEditing(true)}
        >
          <Pencil className='dark:stroke-black' />
        </Button>
        <Button
          size='icon'
          className='bg-red-500 hover:bg-red-500/90'
          onClick={() => setOpenConfirmDialog(true)}
        >
          <Trash className='dark:stroke-black' />
        </Button>
      </div>
      <Textarea
        id={id.toString()}
        value={text}
        onChange={(e) => setText(e.target.value)}
        readOnly={!isEditing}
      />
      <div
        data-disabled={!isEditing}
        className='flex gap-2 data-[disabled="true"]:invisible'
      >
        <Button
          className='bg-primary '
          onClick={() => {
            setIsEditing(false);
            saveRule();
          }}
          disabled={text === "" || text === rule}
        >
          Save
        </Button>
        <Button
          variant='outline'
          className='dark:text-tertiary'
          onClick={() => {
            setIsEditing(false);
            setText(rule);
          }}
        >
          Cancel
        </Button>
      </div>

      <Dialog
        open={openConfrimDialog}
        onOpenChange={setOpenConfirmDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this rule from your booking
              instructions?
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Press confirm to continue, canel to discard changes.
          </DialogDescription>
          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => setOpenConfirmDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => deleteRule()}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingInstructionsDetail;
