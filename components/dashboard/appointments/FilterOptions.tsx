'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { STATUSES } from '@/utils/constants';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const FilterOptions = () => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();

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
    <div className='flex items-center'>
      <Select
        value={filterValue}
        onValueChange={handleFilter}
      >
        <SelectTrigger className='text-lg lg:text-sm'>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel className='text-[1rem]'>Filter</SelectLabel>
            <Separator />
            <SelectItem
              value='all'
              className='text-lg lg:text-sm'
            >
              All
            </SelectItem>
            {STATUSES.map((status, idx) => (
              <SelectItem
                key={idx}
                value={status.toLowerCase()}
                className='text-lg lg:text-sm'
              >
                {status}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterOptions;
