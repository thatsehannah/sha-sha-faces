import { FormLabel } from '@/components/ui/form';
import React from 'react';

type FormInputLabelProps = {
  text: string;
};

const FormInputLabel = ({ text }: FormInputLabelProps) => {
  return (
    <FormLabel className='text-black text-lg capitalize'>{text}</FormLabel>
  );
};

export default FormInputLabel;
