'use client';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { STATUSES } from '@/utils/constants';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const FilterOptions = () => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  console.log(searchParams);

  const filterParam = searchParams.get('f') || 'all';
  const [filterValue, setFilterValue] = useState(filterParam);

  const handleFilter = (value: string) => {
    setFilterValue(value);
    const params = new URLSearchParams(searchParams.toString());

    if (value !== 'all') {
      params.set('f', value);
    } else {
      params.delete('f');
    }

    replace(`/admin/appointments?${params.toString()}`);
  };

  useEffect(() => {
    setFilterValue(filterParam);
  }, [filterParam]);

  return (
    <>
      <div className='hidden lg:block'>
        <RadioGroup
          value={filterValue}
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
      </div>
      <div className='lg:hidden flex'>
        <Select
          value={filterValue}
          onValueChange={handleFilter}
        >
          <SelectTrigger className='text-lg'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Filter</SelectLabel>
              <SelectItem
                value='all'
                className='text-lg'
              >
                All
              </SelectItem>
              {STATUSES.map((status, idx) => (
                <SelectItem
                  key={idx}
                  value={status.toLowerCase()}
                  className='text-lg'
                >
                  {status}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default FilterOptions;
