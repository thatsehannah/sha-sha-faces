import React from 'react';

type AppointmentDetailProps = {
  data: string;
  label: string;
};

const AppointmentDetail = ({ data, label }: AppointmentDetailProps) => {
  return (
    <div className='flex flex-col'>
      <p
        data-label={label}
        data-status={data}
        className="font-bold text-2xl data-[label='email']:normal-case capitalize data-[status='Pending']:text-orange-400 data-[status='Confirmed']:text-blue-400 data-[status='Completed']:text-green-400 data-[status='Canceled']:text-red-400"
      >
        {data}
      </p>
      <p className='font-light text-lg capitalize'>{label}</p>
    </div>
  );
};

export default AppointmentDetail;
