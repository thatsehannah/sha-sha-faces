import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import FormError from './FormError';

type FormRadioGroupProps = {
  name: string;
  label: string;
};

const FormRadioGroup = ({ name, label }: FormRadioGroupProps) => {
  const {
    setValue,
    watch,
    formState: { errors },
    clearErrors,
  } = useFormContext();
  const fieldValue = watch(name);

  return (
    <div className='mb-8'>
      <div>
        <Label
          htmlFor={name}
          className='text-black text-lg'
        >
          {label}
        </Label>
      </div>
      <RadioGroup
        className='flex gap-8 mt-2'
        value={
          fieldValue === true ? 'yes' : fieldValue === false ? 'no' : undefined
        }
        onValueChange={(value) => {
          setValue(name, value === 'yes');
          clearErrors(name);
        }}
      >
        <div className='flex items-center gap-2'>
          <RadioGroupItem
            value='yes'
            id='yes'
          />
          <Label
            htmlFor='yes'
            className='text-xl'
          >
            Yes
          </Label>
        </div>
        <div className='flex items-center gap-2'>
          <RadioGroupItem
            value='no'
            id='no'
          />
          <Label
            htmlFor='no'
            className='text-xl'
          >
            No
          </Label>
        </div>
      </RadioGroup>
      {errors[name] && <FormError>{errors[name].message as string}</FormError>}
    </div>
  );
};

export default FormRadioGroup;
