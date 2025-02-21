import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";
import AvailabilityForm from "./AvailabilityForm";

// const DAYS_OF_WEEK = [
//   "Sunday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
// ];

const ManageAvailabilityCard = () => {
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
          <AvailabilityForm />
        </CardContent>
      </Card>
    </>
  );
};

export default ManageAvailabilityCard;
