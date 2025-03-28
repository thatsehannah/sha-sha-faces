"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { updateService } from "@/utils/actions";
import { Edit } from "lucide-react";
import React, { useState } from "react";

type ServiceDurationDetailProps = {
  id: number;
  duration: string;
};

const ServiceDurationDetail = ({
  id,
  duration,
}: ServiceDurationDetailProps) => {
  const durationArr = duration.split(" ");
  const initialHr = durationArr[0];
  let initialMin = "0";

  if (durationArr.length === 4) {
    initialMin = durationArr[2];
  }

  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [hour, setHour] = useState(initialHr);
  const [minute, setMinute] = useState(initialMin);

  const handleSave = async () => {
    try {
      setIsEditing(false);
      const durationString = `${hour} hr${
        minute !== "0" ? ` ${minute} min` : ""
      }`;
      const newDuration = { ["duration"]: durationString };

      const resultMessage = await updateService(id, newDuration);

      toast({
        variant: "success",
        title: "Success ✅",
        description: resultMessage,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh ☹️",
        description:
          error instanceof Error ? error.message : "An error occurred ",
      });
    }
  };

  return (
    <div className='flex items-center gap-8 p-4'>
      <div className='w-full'>
        <div className='flex items-center gap-3 mb-4'>
          <p className='font-bold text-[1rem] mb-1 capitalize text-foreground'>
            Duration
          </p>
          {!isEditing && (
            <Button
              size='icon'
              className='bg-blue-500 hover:bg-blue-500/90'
              onClick={() => setIsEditing(true)}
            >
              <Edit />
            </Button>
          )}
        </div>
        <div
          id={"duration-" + id.toString()}
          className='flex flex-row gap-6'
        >
          <div className='flex'>
            <Input
              className='rounded-r-none border-r-0 w-16 bg-background'
              value={hour}
              type='number'
              maxLength={2}
              min={0}
              max={23}
              onChange={(e) => setHour(e.target.value)}
            />
            <Input
              readOnly
              defaultValue='hr'
              className='rounded-l-none w-14 text-center'
            />
          </div>
          <div className='flex'>
            <Input
              className='rounded-r-none border-r-0 w-16 bg-background'
              value={minute}
              type='number'
              maxLength={2}
              min={0}
              max={45}
              step={15}
              onChange={(e) => setMinute(e.target.value)}
            />
            <Input
              readOnly
              defaultValue='min'
              className='rounded-l-none w-14 text-center'
            />
          </div>
        </div>
        <div
          data-disabled={!isEditing}
          className='flex mt-4 gap-2 data-[disabled="true"]:invisible'
        >
          <Button
            className='bg-primary '
            onClick={() => {
              handleSave();
            }}
            disabled={
              hour === "" ||
              minute === "" ||
              (hour === initialHr && minute === initialMin)
            }
          >
            Save
          </Button>
          <Button
            variant='outline'
            className='bg-transparent text-black'
            onClick={() => {
              setIsEditing(false);
              setHour(initialHr);
              setMinute(initialMin);
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDurationDetail;
