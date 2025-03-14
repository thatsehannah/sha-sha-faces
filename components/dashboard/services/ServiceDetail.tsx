"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { updateService } from "@/utils/actions";
import { Edit } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

type ServiceDetailProps = {
  id: number;
  data: string;
  label: "price" | "duration" | "description";
};

const ServiceDetail = ({ id, data, label }: ServiceDetailProps) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(data);
  const textareaRef = useRef(null);

  const autoGrow = (element: HTMLTextAreaElement) => {
    element.style.height = "5px";
    element.style.height = element.scrollHeight + "px";
  };

  const handleSave = async () => {
    try {
      const updates = { [label]: text };

      const resultMessage = await updateService(id, updates);

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

  useEffect(() => {
    if (textareaRef.current) {
      autoGrow(textareaRef.current);
    }
  }, []);

  return (
    <div className='flex items-center group/item gap-8 hover:bg-white/50 transition-all p-4 rounded-md'>
      <div className='w-1/2'>
        <p className='font-bold text-[1rem] mb-1 capitalize text-black'>
          {label}
        </p>
        <textarea
          id={id.toString()}
          ref={textareaRef}
          data-disabled={!isEditing}
          className='font-light text-lg w-full h-auto p-3 data-[disabled="true"]:bg-transparent data-[disabled="true"]:text-gray-600 border border-black rounded-md dark:data-[disabled="false"]:bg-white dark:data-[disabled="false"]:text-black'
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={!isEditing}
        />
        <div
          data-disabled={!isEditing}
          className='flex gap-2 data-[disabled="true"]:invisible'
        >
          <Button
            className='bg-primary '
            onClick={() => {
              setIsEditing(false);
              handleSave();
            }}
            disabled={text === "" || text === data}
          >
            Save
          </Button>
          <Button
            variant='outline'
            className='bg-transparent text-black'
            onClick={() => {
              setIsEditing(false);
              setText(data);
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
      {!isEditing && (
        <div className='flex gap-2 group/edit'>
          <div
            className='invisible group-hover/item:visible hover:cursor-pointer transition-all flex items-center gap-2'
            onClick={() => setIsEditing(true)}
          >
            <Edit className='group-hover/edit:scale-125 w-5 h-5 stroke-black' />
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetail;
