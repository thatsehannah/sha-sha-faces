import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { format } from "date-fns";
import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { isDateWithinTwoDays } from "@/lib/utils";
import Link from "next/link";
import { AppointmentWithService } from "@/utils/types";

type AppointmentDetailProps = {
  data: string;
  dataLabel?: string;
  label: string;
};

const AppointmentDetail = ({
  data,
  label,
  dataLabel,
}: AppointmentDetailProps) => {
  return (
    <div className='flex flex-col gap-1'>
      <p
        data-label={dataLabel}
        data-status={data}
        className="font-medium text-xl capitalize data-[label='addtDetails']:normal-case data-[label='email']:normal-case data-[label='instagram']:normal-case data-[status='Pending']:text-orange-400 data-[status='Confirmed']:text-blue-400 data-[status='Completed']:text-green-400 data-[status='Canceled']:text-red-400"
      >
        {data ? data : "---"}
      </p>
      <p className='font-light text-[1rem] capitalize'>{label}</p>
    </div>
  );
};

type AppointmentDetailsSheetProps = {
  appointment: AppointmentWithService;
  children: ReactNode;
};

const AppointmentDetailsSheet = ({
  appointment,
  children,
}: AppointmentDetailsSheetProps) => {
  const {
    createdAt,
    id,
    name,
    status,
    service,
    date,
    time,
    location,
    email,
    instagram,
    discovery,
    requiresTravel,
    addtlDetails,
  } = appointment;
  const isNew = isDateWithinTwoDays(createdAt);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className='overflow-y-scroll'>
        <SheetHeader className=''>
          <SheetTitle className='text-3xl lg:text-4xl text-left'>
            {name}&apos;s Appointment
          </SheetTitle>
          <Separator />
        </SheetHeader>

        <div className='flex flex-col gap-8 my-8'>
          <div className='flex gap-2'>
            <AppointmentDetail
              data={format(createdAt, "PPPP")}
              label='appointment created'
            />
            {isNew && (
              <div className='w-10 h-6 text-center bg-lime-200 p-1 rounded-md text-black font-semibold text-[12px]'>
                New
              </div>
            )}
          </div>
          <AppointmentDetail
            data={status}
            label='status'
          />
          <AppointmentDetail
            data={service.name}
            label='service'
          />
          <AppointmentDetail
            data={format(date, "PPPP")}
            label='date'
          />
          <AppointmentDetail
            data={time}
            label='time of appointment'
          />
          <AppointmentDetail
            data={location}
            label='location'
          />
          <AppointmentDetail
            data={requiresTravel ? "Yes" : "No"}
            label='requires travel'
          />
          <AppointmentDetail
            data={email}
            label='email'
            dataLabel='email'
          />
          <AppointmentDetail
            data={instagram}
            label='instagram'
            dataLabel='instagram'
          />
          <AppointmentDetail
            data={discovery}
            label='how client discovered me'
          />
          <AppointmentDetail
            data={addtlDetails}
            label='additional details'
            dataLabel='addtDetails'
          />
        </div>
        <Separator />
        <Button
          className='w-full mt-4 text-lg'
          asChild
        >
          <Link href={`/admin/appointments/${id}`}>Edit Appointment</Link>
        </Button>
      </SheetContent>
    </Sheet>
  );
};

export default AppointmentDetailsSheet;
