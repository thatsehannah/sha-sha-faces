import React, { ReactNode } from "react";

const FormError = ({ children }: { children: ReactNode }) => {
  return (
    <p className='font-bold text-destructive dark:text-red-700 mt-1'>
      {children}
    </p>
  );
};

export default FormError;
