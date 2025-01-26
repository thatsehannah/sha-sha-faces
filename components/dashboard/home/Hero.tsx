import React from 'react';
import { format } from 'date-fns';
import Overview from './Overview';

const Hero = () => {
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
      <div className='mb-16 flex flex-col justify-center gap-4'>
        <p className='text-5xl capitalize'>
          Good {timeOfDay},{' '}
          <span className='font-extrabold text-primary'>Naisha</span>.
        </p>
        <p className='text-2xl font-extralight'>{format(new Date(), 'PPPP')}</p>
      </div>
      <div>
        <Overview />
      </div>
    </section>
  );
};

export default Hero;
