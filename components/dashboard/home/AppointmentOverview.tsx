import React from "react";
import OverviewCard from "../components/OverviewCard";
import { fetchAllAppointments } from "@/utils/actions";

const AppointmentOverview = async () => {
  const appointments = await fetchAllAppointments();

  //TODO: create a loop that does this using the STATUSES array
  const pendingAppointmentCount = appointments.filter(
    (appt) => appt.status === "Pending",
  ).length;
  const confirmedAppointmentCount = appointments.filter(
    (appt) => appt.status === "Confirmed",
  ).length;
  const completedAppointmentCount = appointments.filter(
    (appt) => appt.status === "Completed",
  ).length;
  const canceledAppointmentCount = appointments.filter(
    (appt) => appt.status === "Canceled",
  ).length;

  return (
    <section>
      <div className='mb-12 bg-muted md:p-12 p-3 rounded-lg w-full'>
        <p className='text-2xl font-medium mb-8'>Appointment Overview</p>
        <div className='grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-4 md:gap-x-12 md:gap-y-8 '>
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
