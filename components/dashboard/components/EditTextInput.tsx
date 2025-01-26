'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';

const EditTextInput = ({
  label,
  value,
  disabled = true,
}: {
  label: string;
  value: string;
  disabled?: boolean;
}) => {
  const [inputValue, setInputValue] = useState(value);

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
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={disabled}
          className='font-medium text-xl border-x-0 border-t-0 rounded-none shadow-none'
        />
      </div>
    </div>
  );
};

export default EditTextInput;
