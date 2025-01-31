import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Appointment } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { format, parseISO } from 'date-fns';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export const columns: ColumnDef<Appointment>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      return <div className='capitalize'>{row.original.name}</div>;
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'instagram',
    header: 'Instagram',
    cell: ({ row }) => {
      return (
        <div>
          {row.original.instagram !== '' ? row.original.instagram : '---'}
        </div>
      );
    },
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone Number',
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      const formattedDate = format(parseISO(row.original.date), 'PPPP');

      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: 'time',
    header: 'Time',
  },
  {
    accessorKey: 'service',
    header: 'Service',
    cell: ({ row }) => {
      return <div className='capitalize'>{row.original.service}</div>;
    },
  },
  {
    accessorKey: 'location',
    header: 'Location',
  },
  {
    accessorKey: 'discovery',
    header: 'Discovery',
    cell: ({ row }) => {
      return <div className='capitalize'>{row.original.discovery}</div>;
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      return (
        <div
          data-status={row.original.status}
          className="data-[status='Pending']:text-orange-400 data-[status='Confirmed']:text-blue-400 data-[status='Completed']:text-green-400 data-[status='Canceled']:text-red-400"
        >
          {row.original.status}
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => {
      const formattedDate = format(row.original.createdAt, 'PPPP');

      return <div>{formattedDate}</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const appointment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              className='h-8 w-8 p-0'
            >
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem
              className='text-lg'
              asChild
            >
              <Link href={`/admin/appointments/${appointment.id}`}>
                Edit Appointment
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
