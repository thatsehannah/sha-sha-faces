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
import { Edit, Trash } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

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
  const label = `Instruction #${index + 1}`;
  const textareaRef = useRef(null);

  const autoGrow = (element: HTMLTextAreaElement) => {
    element.style.height = "5px";
    element.style.height = element.scrollHeight + "px";
  };

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

  useEffect(() => {
    if (textareaRef.current) {
      autoGrow(textareaRef.current);
    }
  }, []);

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center gap-3'>
        <Label
          htmlFor={id.toString()}
          className='text-xl mr-6 font-medium'
        >
          {label}
        </Label>{" "}
        {!isEditing && (
          <Button
            size='icon'
            className='bg-blue-500 hover:bg-blue-500/90'
            onClick={() => setIsEditing(true)}
          >
            <Edit />
          </Button>
        )}
        <Button
          size='icon'
          className='bg-red-500 hover:bg-red-500/90'
          onClick={() => setOpenConfirmDialog(true)}
        >
          <Trash />
        </Button>
      </div>
      <Textarea
        id={id.toString()}
        ref={textareaRef}
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
