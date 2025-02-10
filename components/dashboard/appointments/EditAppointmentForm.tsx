'use client';

import React, { useState } from 'react';
import times from '@/utils/appointmentTimes.json';
import EditTextInput from '../components/EditTextInput';
import EditDropdown from '../components/EditDropdown';
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
import { FormProvider, useForm } from 'react-hook-form';
import { DialogDescription } from '@radix-ui/react-dialog';
import { updateAppointment } from '@/utils/actions';
import { useToast } from '@/hooks/use-toast';
import { redirect } from 'next/navigation';
import { AppointmentWithService, EditAppointment } from '@/utils/types';
import EditDatePicker from '../components/EditDatePicker';

type EditAppointmentProps = {
  appointment: AppointmentWithService;
  serviceInfo: { id: number; name: string }[];
};

const EditAppointmentForm = ({
  appointment,
  serviceInfo,
}: EditAppointmentProps) => {
  const { toast } = useToast();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const {
    name,
    email,
    phoneNumber,
    service,
    location,
    time,
    status,
    id,
    date,
  } = appointment;

  const serviceNames = serviceInfo.map((s) => s.name);

  const form = useForm<EditAppointment>({
    defaultValues: {
      name,
      email,
      phoneNumber,
      service: service.name,
      location,
      time,
      status,
      completedOn: new Date().toLocaleDateString(),
      date,
    },
  });

  const statusValue = form.watch('status');

  const handleSubmit = async (values: EditAppointment) => {
    const dirtyFields = Object.keys(form.formState.dirtyFields);
    const updatedValues = Object.fromEntries(
      dirtyFields.map((field) => [
        field,
        values[field as keyof EditAppointment],
      ])
    ) as EditAppointment;

    const result = await updateAppointment(id, updatedValues);

    toast({
      variant: result.type,
      title: result.title,
      description: result.message,
    });

    setOpenConfirmDialog(false);
    redirect('/admin/appointments');
  };

  return (
    <>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          id='editAppointmentForm'
        >
          <div>
            <div className='grid grid-cols-1 xl:grid-cols-3 gap-8 my-8'>
              <EditTextInput
                label='name'
                name='name'
              />
              <EditTextInput
                label='email'
                name='email'
              />
              <EditTextInput
                label='phone number'
                name='phoneNumber'
              />
              <EditDropdown
                label='service'
                name='service'
                values={serviceNames}
                form={form}
              />
              <EditDatePicker
                label='date'
                name='date'
                defaultValue={date}
              />
              <EditDropdown
                label='time'
                name='time'
                values={times}
                form={form}
              />
              <EditTextInput
                label='location'
                name='location'
                disabled={false}
              />
              <EditDropdown
                label='status'
                name='status'
                values={STATUSES}
                form={form}
              />
              {statusValue === 'Completed' ? (
                <EditDatePicker
                  label='completed on'
                  name='completedOn'
                />
              ) : null}
            </div>
            <Separator className='block lg:hidden' />
            <div className='flex justify-center lg:justify-end mt-8'>
              <Button
                className='w-full lg:w-auto'
                type='button'
                disabled={!form.formState.isDirty}
                onClick={() => setOpenConfirmDialog(true)}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>

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
          <DialogDescription>
            Press confirm to continue, cancel to discard changes.
          </DialogDescription>
          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => setOpenConfirmDialog(false)}
            >
              Cancel
            </Button>
            <Button
              type='submit'
              form='editAppointmentForm'
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditAppointmentForm;
