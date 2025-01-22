import { FormLabel } from '@/components/ui/form';
import React from 'react';

type FormInputLabelProps = {
  text: string;
  name: string;
};

const FormInputLabel = ({ text, name }: FormInputLabelProps) => {
  return (
    <FormLabel
      htmlFor={name}
      className='text-black text-lg'
    >
      {text}
    </FormLabel>
  );
};

export default FormInputLabel;
