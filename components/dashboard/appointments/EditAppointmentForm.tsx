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
import { FormProvider, useForm } from 'react-hook-form';
import { DialogDescription } from '@radix-ui/react-dialog';

type EditAppointmentProps = {
  appointment: Appointment;
};

const EditAppointmentForm = ({ appointment }: EditAppointmentProps) => {
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const { name, email, phoneNumber, service, location, time, status } =
    appointment;
  const serviceNames = services.map((service) => service.name);

  const form = useForm<Appointment>({
    defaultValues: {
      name,
      email,
      phoneNumber,
      service,
      location,
      time,
      status,
    },
  });

  const handleSubmit = async (values: Appointment) => {
    const dirtyFields = Object.keys(form.formState.dirtyFields);

    // dirtyFields.map(): Loops over the dirty fields and creates an array of [fieldName, fieldValue] pairs.
    // values[field as keyof Appointment]: Retrieves the value for each dirty field from the values object.
    // Object.fromEntries(): Converts the array of key-value pairs into an object, where each key is the name of a dirty field, and each value is its corresponding value in the form.
    const updatedValues = Object.fromEntries(
      dirtyFields.map((field) => [field, values[field as keyof Appointment]])
    ) as Partial<Appointment>;

    console.log(updatedValues);

    setOpenConfirmDialog(false);
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
              <EditTextInput
                label='location'
                name='location'
                disabled={false}
              />
              <EditDropdown
                label='time'
                name='time'
                values={times}
                form={form}
              />
              <EditDropdown
                label='status'
                name='status'
                values={STATUSES}
                form={form}
              />
            </div>
            <Separator className='block lg:hidden' />
            <div className='flex justify-center lg:justify-end mt-8'>
              <p>Form is {form.formState.isDirty ? 'dirty' : 'clean'}.</p>
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
