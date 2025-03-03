import React from "react";
import AppointmentCard from "./AppointmentCard";
import { AppointmentWithService } from "@/utils/types";
import EmptyResults from "@/components/global/EmptyResults";

type AppointmendGridProps = {
  appointments: AppointmentWithService[];
};

const AppointmentGrid = ({ appointments }: AppointmendGridProps) => {
  if (appointments.length === 0) {
    return <EmptyResults />;
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8'>
      {appointments.map((appt) => (
        <AppointmentCard
          key={appt.id}
          appointment={appt}
        />
      ))}
    </div>
  );
};

export default AppointmentGrid;
