import React, { ReactNode } from "react";

const FormError = ({ children }: { children: ReactNode }) => {
  return <p className='font-bold text-destructive mt-1'>{children}</p>;
};

export default FormError;
