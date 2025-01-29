'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CircleX } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const SearchFilter = () => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const filterParam = searchParams.get('search') || '';
  const [filterValue, setFilterValue] = useState(filterParam);

  const handleSearchFilter = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (filterValue === '') {
      params.delete('search');
    } else {
      params.set('search', filterValue);
    }

    replace(`/admin/appointments?${params.toString()}`);
  };

  useEffect(() => {
    setFilterValue(filterParam);
  }, [filterParam]);

  const handleSearchClear = () => {
    setFilterValue('');
    const params = new URLSearchParams(searchParams.toString());

    const search = searchParams.get('search');

    if (search) {
      params.delete('search');
      replace(`/admin/appointments?${params.toString()}`);
    }
  };

  return (
    <div className='flex gap-2 items-center'>
      <Input
        placeholder='Search by name or email'
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
        className='w-44 lg:w-52'
      />
      <Button onClick={handleSearchFilter}>Search</Button>
      <Button
        asChild
        variant='ghost'
        onClick={handleSearchClear}
        size='icon'
        className='w-6 h-6'
      >
        <CircleX />
      </Button>
    </div>
  );
};

export default SearchFilter;
