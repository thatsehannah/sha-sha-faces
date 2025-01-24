import { Appointment } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Appointment>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone Number',
  },
  {
    accessorKey: 'date',
    header: 'Date',
  },
  {
    accessorKey: 'time',
    header: 'Time',
  },
  {
    accessorKey: 'service',
    header: 'Service',
  },
  {
    accessorKey: 'location',
    header: 'Location',
  },
  {
    accessorKey: 'discovery',
    header: 'Discovery',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
  },
];
