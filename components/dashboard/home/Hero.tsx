import { fetchAppointmentsByDate } from '@/utils/actions';
import React from 'react';
import AppointmentCard from '../components/AppointmentCard';

const Hero = async () => {
  const todayAppointments = await fetchAppointmentsByDate();

  const currentHour = new Date().getHours();
  let timeOfDay: string;

  if (currentHour >= 0 && currentHour < 12) {
    timeOfDay = 'morning';
  } else if (currentHour >= 12 && currentHour < 17) {
    timeOfDay = 'afternoon';
  } else {
    timeOfDay = 'evening';
  }

  return (
    <section>
      <div className='mb-24 flex justify-center gap-4'>
        <p className='text-7xl capitalize font-extralight'>
          Good {timeOfDay},{' '}
          <span className='font-extrabold text-primary'>Naisha</span>.
        </p>
      </div>
      <div>
        <p className='font-medium text-4xl mb-6'>Your day at a glance:</p>
        {todayAppointments.length === 0 ? (
          <p className='text-center font-normal text-2xl bg-secondary rounded-md p-4'>
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
    </section>
  );
};

export default Hero;
