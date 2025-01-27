'use client';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { STATUSES } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const FilterOptions = () => {
  const [filterValue, setFilterValue] = useState('all');
  const { replace } = useRouter();
  const params = new URLSearchParams();

  const handleFilter = (value: string) => {
    setFilterValue(value);

    if (value !== 'all') {
      params.set('f', value);
    } else {
      params.delete('f');
    }

    replace(`/admin/appointments?${params.toString()}`);
  };

  return (
    <RadioGroup
      defaultValue={filterValue}
      orientation='horizontal'
      className='flex gap-8'
      onValueChange={handleFilter}
    >
      <div className='flex items-center space-x-2'>
        <RadioGroupItem
          value='all'
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
            value={status.toLowerCase()}
            id={status}
          />
          <Label htmlFor={status}>{status}</Label>
        </div>
      ))}
    </RadioGroup>
  );
};

export default FilterOptions;
