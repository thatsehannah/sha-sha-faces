import React, { ReactNode } from 'react';

const FormError = ({ children }: { children: ReactNode }) => {
  return (
    <p className='text-lg font-medium text-destructive dark:text-red-700 mt-1'>
      {children}
    </p>
  );
};

export default FormError;
