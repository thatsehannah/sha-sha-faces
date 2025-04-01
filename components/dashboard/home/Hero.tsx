"use client";

import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { AppointmentWithService } from "@/utils/types";
import AppointmentCard from "../components/AppointmentCard";

type HeroProps = {
  todaysAppointments: AppointmentWithService[];
};

const Hero = ({ todaysAppointments }: HeroProps) => {
  const [timeOfDay, setTimeOfDay] = useState("");

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour >= 0 && currentHour < 12) {
      setTimeOfDay("morning");
    } else if (currentHour >= 12 && currentHour < 17) {
      setTimeOfDay("afternoon");
    } else {
      setTimeOfDay("evening");
    }
  }, []);

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
        {todaysAppointments.length === 0 ? (
          <p className='text-center font-normal text-black text-xl tracking-wide bg-secondary text-secondary-foreground rounded-md p-4'>
            No appointments today.
          </p>
        ) : (
          todaysAppointments.map((appt, idx) => (
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
