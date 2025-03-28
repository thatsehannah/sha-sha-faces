"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { updateService } from "@/utils/actions";
import { Edit } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

type ServiceDetailProps = {
  id: number;
  data: string;
  label: "price" | "description";
};

const ServiceDetail = ({ id, data, label }: ServiceDetailProps) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [valueToUpdate, setValueToUpdate] = useState<string>(data);
  const textareaRef = useRef(null);

  const autoGrow = (element: HTMLTextAreaElement) => {
    element.style.height = "5px";
    element.style.height = element.scrollHeight + "px";
  };

  const priceValueCheck = () => {
    if (valueToUpdate.trim() !== valueToUpdate) {
      setIsEditing(true);
      throw new Error(
        "There's white space either before or after the text you've provided. Please check and remove."
      );
    }

    //tempPriceValue only will be used to check if valueToUpdate state is a valid num or too long (without modifying the state)
    let tempPriceValue = valueToUpdate;
    if (tempPriceValue[0] === "$") {
      tempPriceValue = valueToUpdate.slice(1);
    }

    if (tempPriceValue.length > 5) {
      setIsEditing(true);
      throw new Error("Price is too long.");
    }

    if (!parseInt(tempPriceValue)) {
      setIsEditing(true);
      setValueToUpdate(data);
      throw new Error("Price must be a number.");
    }

    //fail safe if client forgets to add a $ when updating price
    let priceValue = valueToUpdate;
    if (priceValue[0] !== "$") {
      priceValue = "$" + priceValue;
      setValueToUpdate(priceValue);
    }

    return priceValue;
  };

  const handleSave = async () => {
    try {
      setIsEditing(false);
      let dbValue = valueToUpdate;

      //TODO: create a ServicePriceDetail component (like ServiceDurationDetail component)
      if (label === "price") {
        dbValue = priceValueCheck();
      }

      const updates = { [label]: dbValue };

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
    <div className='flex items-center gap-8 p-4'>
      <div className='w-full'>
        <div className='flex items-center gap-3 mb-4'>
          <p className='font-bold text-[1rem] mb-1 capitalize text-foreground'>
            {label}
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

        <Textarea
          id={id.toString()}
          ref={textareaRef}
          value={valueToUpdate}
          onChange={(e) => setValueToUpdate(e.target.value)}
          readOnly={!isEditing}
          className={`${isEditing} ? bg-background : ""`}
        />

        <div
          data-disabled={!isEditing}
          className='flex mt-4 gap-2 data-[disabled="true"]:invisible'
        >
          <Button
            className='bg-primary '
            onClick={() => {
              handleSave();
            }}
            disabled={valueToUpdate === "" || valueToUpdate === data}
          >
            Save
          </Button>
          <Button
            variant='outline'
            className='bg-transparent text-black'
            onClick={() => {
              setIsEditing(false);
              setValueToUpdate(data);
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
