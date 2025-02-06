import {
  fetchAllAppointments,
  fetchServiceWithAppointments,
} from '@/utils/actions';
import React from 'react';
import AppointmentCard from '../components/AppointmentCard';
import OverviewCard from '../components/OverviewCard';

const Overview = async () => {
  const allAppointments = await fetchAllAppointments();
  const pendingAppointmentCount = allAppointments.filter(
    (appt) => appt.status === 'Pending'
  ).length;
  const confirmedAppointmentCount = allAppointments.filter(
    (appt) => appt.status === 'Confirmed'
  ).length;
  const completedAppointmentCount = allAppointments.filter(
    (appt) => appt.status === 'Completed'
  ).length;

  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = allAppointments.filter(
    (appt) => appt.date === today && appt.status === 'Confirmed'
  );

  const services = await fetchServiceWithAppointments();
  const servicesWithAppts = services.filter((s) => s.Appointment.length > 0);
  console.log(typeof servicesWithAppts);

  return (
    <section>
      <div className='mb-24'>
        <p className='font-normal text-2xl mb-6'>Your day at a glance:</p>
        {todayAppointments.length === 0 ? (
          <p className='text-center font-medium text-foreground text-xl tracking-wide bg-gradient-to-r from-background via-secondary to-background rounded-md p-4'>
            No appointments today.
          </p>
        ) : (
          todayAppointments.map((appt, idx) => (
            <AppointmentCard
              key={idx}
              appointment={appt}
            />
          ))
        )}
      </div>
      <div className='mb-12 bg-slate-100 p-12 rounded-lg'>
        <p className='text-2xl font-medium mb-8'>Appointment Overview</p>
        <div className='grid grid-cols-2 lg:grid-cols-3 items-center justify-center gap-4 lg:gap-x-12 lg:gap-y-8 '>
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
        </div>
      </div>

      <div className='grid grid-cols-12 bg-slate-100 p-12 rounded-lg gap-4'>
        <div className='col-span-8 bg-green-200'>
          Total Services Pie Chart (This Month)
        </div>
        <div className='col-span-4 bg-blue-200'>Recent Appointments</div>
      </div>
    </section>
  );
};

export default Overview;
