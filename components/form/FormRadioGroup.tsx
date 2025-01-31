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
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const fieldValue = watch(name);
  const error = errors[name]?.message as string | undefined;

  return (
    <div className='mb-8'>
      <Label className='text-lg text-black'>{label}</Label>
      <RadioGroup
        className='mt-2 space-y-2'
        value={fieldValue} // Get the value from RHF's watch
        onValueChange={(value) => setValue(name, value === 'true')}
      >
        <Label
          htmlFor={`${name}-true`}
          className='flex items-center space-x-2'
        >
          <RadioGroupItem
            id={`${name}-true`}
            value='true'
            {...register(name)}
          />
          <span className='text-black'>Yes</span>
        </Label>
        <Label
          htmlFor={`${name}-false`}
          className='flex items-center space-x-2'
        >
          <RadioGroupItem
            id={`${name}-false`}
            value='false'
            {...register(name)}
          />
          <span className='text-black'>No</span>
        </Label>
      </RadioGroup>
      {error && <FormError>{error}</FormError>}
    </div>
  );
};

export default FormRadioGroup;
