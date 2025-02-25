import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";
import AvailabilityForm from "./AvailabilityForm";
import { Availability } from "@/utils/types";

type ManageAvailabilityCardProps = {
  availability: Availability[];
};

const ManageAvailabilityCard = ({
  availability,
}: ManageAvailabilityCardProps) => {
  return (
    <>
      <Card>
        <CardHeader>
          <div className='flex gap-4 justify-between items-center mb-4'>
            <CardTitle className='text-2xl font-medium'>
              Manage Availability
            </CardTitle>
          </div>
          <Separator />
        </CardHeader>
        <CardContent>
          <AvailabilityForm availability={availability} />
        </CardContent>
      </Card>
    </>
  );
};

export default ManageAvailabilityCard;
