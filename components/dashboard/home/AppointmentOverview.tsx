import React from "react";
import OverviewCard from "../components/OverviewCard";
import { fetchAllAppointments } from "@/utils/actions";

const AppointmentOverview = async () => {
  const appointments = await fetchAllAppointments();

  const pendingAppointmentCount = appointments.filter(
    (appt) => appt.status === "Pending"
  ).length;
  const confirmedAppointmentCount = appointments.filter(
    (appt) => appt.status === "Confirmed"
  ).length;
  const completedAppointmentCount = appointments.filter(
    (appt) => appt.status === "Completed"
  ).length;
  const canceledAppointmentCount = appointments.filter(
    (appt) => appt.status === "Canceled"
  ).length;

  return (
    <section>
      <div className='mb-12 bg-muted p-12 rounded-lg w-full'>
        <p className='text-2xl font-medium mb-8'>Appointment Overview</p>
        <div className='grid grid-cols-1 lg:grid-cols-2 items-center justify-center gap-4 lg:gap-x-12 lg:gap-y-8 '>
          <OverviewCard
            title='Pending'
            value={pendingAppointmentCount}
          />
          <OverviewCard
            title='Confirmed'
            value={confirmedAppointmentCount}
          />
          <OverviewCard
            title='Completed'
            value={completedAppointmentCount}
          />
          <OverviewCard
            title='Canceled'
            value={canceledAppointmentCount}
          />
        </div>
      </div>
    </section>
  );
};

export default AppointmentOverview;
