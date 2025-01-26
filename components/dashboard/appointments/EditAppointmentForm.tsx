'use client';

import React, { useState } from 'react';
import services from '@/utils/services.json';
import times from '@/utils/appointmentTimes.json';
import EditTextInput from '../components/EditTextInput';
import EditDropdown from '../components/EditDropdown';
import { Appointment } from '@prisma/client';
import { STATUSES } from '@/utils/constants';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

type EditAppointmentProps = {
  appointment: Appointment;
};

const EditAppointmentForm = ({ appointment }: EditAppointmentProps) => {
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const { name, email, phoneNumber, service, location, time, status } =
    appointment;
  const serviceNames = services.map((service) => service.name);

  return (
    <>
      <div>
        <div className='grid grid-cols-1 xl:grid-cols-3 gap-8 my-8'>
          <EditTextInput
            label='name'
            value={name}
          />
          <EditTextInput
            label='email'
            value={email}
          />
          <EditTextInput
            label='phone number'
            value={phoneNumber}
          />
          <EditDropdown
            label='service'
            values={serviceNames}
            defaultValue={service}
          />
          <EditTextInput
            label='location'
            value={location}
            disabled={false}
          />
          <EditDropdown
            label='service'
            values={times}
            defaultValue={time}
          />
          <EditDropdown
            label='status'
            values={STATUSES}
            defaultValue={status}
          />
        </div>
        <Separator className='block lg:hidden' />
        <div className='flex justify-center lg:justify-end mt-8'>
          <Button
            className='w-full lg:w-auto'
            onClick={() => setOpenConfirmDialog(true)}
          >
            Save Changes
          </Button>
        </div>
      </div>

      <Dialog
        open={openConfirmDialog}
        onOpenChange={setOpenConfirmDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to make these changes?
            </DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button variant='outline'>Cancel</Button>
            <Button>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditAppointmentForm;
