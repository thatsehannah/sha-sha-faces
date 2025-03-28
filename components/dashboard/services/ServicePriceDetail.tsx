"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { updateService } from "@/utils/actions";
import { Edit } from "lucide-react";
import React, { useState } from "react";

type ServicePriceDetailProps = {
  id: number;
  price: string;
};

const ServicePriceDetail = ({ id, price }: ServicePriceDetailProps) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const initialPrice = price.slice(1);
  const [newPrice, setNewPrice] = useState(initialPrice);

  const handleSave = async () => {
    try {
      setIsEditing(false);
      const priceString = `$${newPrice}`;

      const priceDbValue = { ["price"]: priceString };

      const resultMessage = await updateService(id, priceDbValue);

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
            price
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
          id={"price-" + id.toString()}
          className='flex flex-row gap-6'
        >
          <div className='flex'>
            <Input
              readOnly
              defaultValue='$'
              className='rounded-r-none w-14 text-center'
            />
            <Input
              className='rounded-l-none border-l-0 w-20 bg-background'
              value={newPrice}
              maxLength={4}
              readOnly={!isEditing}
              onChange={(e) => setNewPrice(e.target.value)}
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
            disabled={newPrice === "" || newPrice === initialPrice}
          >
            Save
          </Button>
          <Button
            variant='outline'
            className='bg-transparent text-black'
            onClick={() => {
              setIsEditing(false);
              setNewPrice(initialPrice);
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServicePriceDetail;
