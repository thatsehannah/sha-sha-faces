'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';
import { useFormContext } from 'react-hook-form';

type EditTextInputProps = {
  label: string;
  disabled?: boolean;
  name: string;
};

const EditTextInput = ({
  label,
  disabled = true,
  name,
}: EditTextInputProps) => {
  const { register } = useFormContext();

  return (
    <div>
      <Label
        htmlFor={label}
        className='text-xl font-light capitalize'
      >
        {label}
      </Label>
      <div>
        <Input
          id={label}
          {...register(name)}
          disabled={disabled}
          className='mt-2 font-medium lg:text-[1rem] border-x-0 border-t-0 rounded-none shadow-none'
        />
      </div>
    </div>
  );
};

export default EditTextInput;
