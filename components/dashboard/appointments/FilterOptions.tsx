import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { STATUSES } from '@/utils/constants';
import React from 'react';

const FilterOptions = () => {
  return (
    <RadioGroup
      defaultValue='All'
      orientation='horizontal'
      className='flex gap-8'
    >
      <div className='flex items-center space-x-2'>
        <RadioGroupItem
          value='All'
          id='all'
        />
        <Label htmlFor='all'>All</Label>
      </div>
      {STATUSES.map((status, idx) => (
        <div
          key={idx}
          className='flex items-center space-x-2'
        >
          <RadioGroupItem
            value={status}
            id={status}
          />
          <Label htmlFor={status}>{status}</Label>
        </div>
      ))}
    </RadioGroup>
  );
};

export default FilterOptions;
