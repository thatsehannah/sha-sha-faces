'use client';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { SelectValue } from '@radix-ui/react-select';
import React, { useState } from 'react';

type EditDropdownProps = {
  label: string;
  values: string[];
  defaultValue: string;
};

const EditDropdown = ({ label, values, defaultValue }: EditDropdownProps) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  return (
    <div>
      <Label
        htmlFor={label}
        className='text-xl font-light capitalize'
      >
        {label}
      </Label>
      <div>
        <Select
          value={selectedValue}
          onValueChange={(value) => setSelectedValue(value)}
        >
          <SelectTrigger className='capitalize font-medium'>
            <SelectValue></SelectValue>
          </SelectTrigger>
          <SelectContent>
            {values.map((value) => (
              <SelectItem
                key={value}
                value={value}
                className='capitalize'
              >
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default EditDropdown;
