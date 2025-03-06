import React from "react";
import { format } from "date-fns";
import { AppointmentWithService } from "@/utils/types";
import AppointmentCard from "../components/AppointmentCard";

type HeroProps = {
  appointments: AppointmentWithService[];
};

const Hero = ({ appointments }: HeroProps) => {
  const currentHour = new Date().getHours();
  const today = new Date().toLocaleDateString();
  const todayAppointments = appointments.filter(
    (appt) => appt.date === today && appt.status === "Confirmed"
  );

  let timeOfDay: string;
  if (currentHour >= 0 && currentHour < 12) {
    timeOfDay = "morning";
  } else if (currentHour >= 12 && currentHour < 17) {
    timeOfDay = "afternoon";
  } else {
    timeOfDay = "evening";
  }

  return (
    <section>
      <div className='mb-16 flex flex-col justify-center gap-4'>
        <p className='text-[2rem] lg:text-5xl capitalize'>
          Good {timeOfDay}, <span className='font-extrabold'>Naisha</span>.
        </p>
        <p className='text-xl lg:text-2xl font-light'>
          {format(new Date(), "PPPP")}
        </p>
      </div>
      <div className='mb-24 w-full'>
        <p className='font-medium text-2xl mb-6'>Your day at a glance:</p>
        {todayAppointments.length === 0 ? (
          <p className='text-center font-normal text-black text-xl tracking-wide bg-periwinkle rounded-md p-4'>
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
