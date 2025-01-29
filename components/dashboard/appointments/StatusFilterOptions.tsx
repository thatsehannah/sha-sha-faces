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

const StatusFilterOptions = () => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const filterParam = searchParams.get('s') || 'all';
  const [filterValue, setFilterValue] = useState(filterParam);

  const handleStatusFilter = (value: string) => {
    setFilterValue(value);
    const params = new URLSearchParams(searchParams.toString());

    if (value !== 'all') {
      params.set('s', value);
    } else {
      params.delete('s');
    }

    replace(`/admin/appointments?${params.toString()}`);
  };

  useEffect(() => {
    setFilterValue(filterParam);
  }, [filterParam]);

  return (
    <div className='w-full flex justify-between'>
      <div className='flex items-center'>
        <Select
          value={filterValue}
          onValueChange={handleStatusFilter}
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
    </div>
  );
};

export default StatusFilterOptions;
