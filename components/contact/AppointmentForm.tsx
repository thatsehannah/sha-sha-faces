"use client";

import React, { useEffect, useState } from "react";
import { FieldErrors, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import {
  appointmentSchema,
  validateAppointmentSchema,
} from "@/utils/appointmentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import FormInput from "../form/FormInput";
import FormDropdown from "../form/FormDropdown";
import FormDatePicker from "../form/FormDatePicker";
import { Appointment, Availability } from "@/utils/types";
import {
  createAppointmentAction,
  fetchAvailabilityForDay,
} from "@/utils/actions";
import { useToast } from "@/hooks/use-toast";
import InstructionsDrawer from "./InstructionsDrawer";
import { RotateCw } from "lucide-react";
import { Button } from "../ui/button";
import { format } from "date-fns";
import {
  blockOffAvailbilityTimeOptions,
  getAvailabilityTimeOptions,
} from "@/lib/utils";
import { DISCOVERIES } from "@/utils/constants";

type AppointmentFormProps = {
  serviceData: { name: string; id: number }[];
  weeklyAvailability: Availability[];
  bookingInstructions: string[];
};

const AppointmentForm = ({
  serviceData,
  weeklyAvailability,
  bookingInstructions,
}: AppointmentFormProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const [availableTimes, setAvailableTimes] = useState(
    getAvailabilityTimeOptions()
  );

  const serviceNames = serviceData.map((s) => s.name);

  const handleOpenDrawer = () => {
    setOpen(!open);
  };

  //getting service (via index) from query string
  const searchParams = useSearchParams();
  const paramValue = searchParams.has("a") && searchParams.get("a");

  let defaultService: string = "";
  if (paramValue) {
    const idx = parseInt(paramValue);
    defaultService = serviceData.find((s) => s.id === idx)?.name || "";
  }

  const form = useForm<z.infer<typeof appointmentSchema>>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      date: "",
      time: "",
      service: defaultService,
      addtlDetails: "",
      location: "",
      isInstructionsAcknowledged: false,
      instagram: "",
      requiresTravel: false,
    },
  });

  const onSubmit = async (data: Appointment) => {
    try {
      console.log("what's happening...");

      const validatedData = validateAppointmentSchema(data);

      const resultMessage = await createAppointmentAction(validatedData);

      toast({
        variant: "success",
        title: "Success! ✅",
        description: resultMessage,
      });

      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh ☹️",
        description:
          error instanceof Error ? error.message : "An error occurred ",
      });
    }
  };

  const onInvalid = (errors: FieldErrors<Appointment>) => {
    toast({
      variant: "destructive",
      title: "Uh oh ☹️",
      description:
        "There are errors in your form. Please fix them before submitting.",
    });

    const firstError = Object.keys(errors)[0];
    const errorElement = document.querySelector(`[name="${firstError}"`);
    if (errorElement) {
      errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const selectedDate = form.watch("date");

  useEffect(() => {
    let isFormMounted = true;

    const getAvailabiltyForSelectedDate = async () => {
      const allAvailableTimes = getAvailabilityTimeOptions();

      if (selectedDate) {
        const dayOfSelectedDate = format(
          new Date(selectedDate),
          "EEEE"
        ).toLowerCase();

        const availability = await fetchAvailabilityForDay(dayOfSelectedDate);

        const idxFrom = allAvailableTimes.indexOf(availability!.from);
        const idxTo = allAvailableTimes.indexOf(availability!.to);
        const availableTimes = allAvailableTimes.slice(idxFrom, idxTo + 1);

        const modifiedAvailableTimes = await blockOffAvailbilityTimeOptions(
          selectedDate,
          availableTimes
        );

        if (isFormMounted) {
          setAvailableTimes(modifiedAvailableTimes);
        }
      }
    };

    getAvailabiltyForSelectedDate();

    return () => {
      isFormMounted = false;
    };
  }, [selectedDate]);

  return (
    <>
      <FormProvider {...form}>
        <motion.form
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          className='w-full lg:w-[65vw]'
          id='createAppointmentForm'
          onSubmit={form.handleSubmit(onSubmit, onInvalid)}
        >
          <section className='flex flex-col items-center gap-5 lg:gap-3 mb-20'>
            <p className='text-xl lg:text-2xl font-light'>
              Please review{" "}
              <span
                className='font-bold hover:cursor-pointer underline'
                onClick={handleOpenDrawer}
              >
                instructions
              </span>{" "}
              prior to booking to ensure a smooth experience.
            </p>
            <div className='flex items-center space-x-2'>
              {/* instruction acknowledgement */}
              <FormInput
                name='isInstructionsAcknowledged'
                label='I have read and understood booking instructions.'
                type='checkbox'
              />
            </div>
          </section>
          <section className='bg-secondary rounded-md p-8 lg:px-20 lg:py-8 shadow-2xl'>
            <div className='mb-20'>
              <p className='text-3xl lg:text-4xl text-black font-bold mb-6'>
                Contact Information
              </p>

              {/* name */}
              <FormInput
                name='name'
                label='Full Name'
                placeholder='e.g. Jane Doe'
              />

              {/* email */}
              <FormInput
                name='email'
                label='Email'
                placeholder='e.g. janedoe@domain.com'
              />

              <FormInput
                name='instagram'
                label='Instagram Username'
                placeholder='e.g. @username'
              />

              {/* phone number */}
              <FormInput
                name='phoneNumber'
                label='Phone Number'
                placeholder='e.g. (213) 555-5555'
              />
            </div>
            <div className='mb-20'>
              <p className='text-3xl lg:text-4xl text-black font-bold mb-4'>
                Appointment Information
              </p>

              {/* service */}
              <FormDropdown
                name='service'
                label='Type'
                placeholder='Select a service'
                values={serviceNames}
              />

              {/* date */}
              <FormDatePicker
                name='date'
                label='Date'
                availability={weeklyAvailability}
              />

              {/* time */}
              <FormDropdown
                name='time'
                label='Time'
                placeholder='Select a time'
                values={availableTimes}
              />

              {/* location */}
              <div className='flex flex-col gap-2'>
                <FormInput
                  name='location'
                  label='Location'
                  placeholder='e.g. Los Angeles, CA'
                />
                <div className='-mt-6'>
                  <FormInput
                    name='requiresTravel'
                    label='I need you to travel to me'
                    type='checkbox'
                  />
                </div>
              </div>
            </div>
            <div className='mb-20'>
              <p className='text-3xl lg:text-4xl text-black font-bold mb-4'>
                Additional Information
              </p>

              {/* how did you hear about us */}
              <FormDropdown
                name='discovery'
                label='How did you hear about us?'
                placeholder='Select a source'
                values={DISCOVERIES}
              />

              {/* custom requests */}
              <FormInput
                name='addtlDetails'
                label='Comments'
                placeholder='Add any information you would like for me to know prior to your appointment.'
                type='textarea'
              />
            </div>
            {/* submit button */}
            <Button
              disabled={form.formState.isSubmitting}
              type='submit'
              className='uppercase text-xl'
            >
              {form.formState.isSubmitting ? (
                <>
                  <RotateCw className='mr-2 h-4 w-4 animate-spin' />
                  Please wait...
                </>
              ) : (
                <>submit request</>
              )}
            </Button>
          </section>
        </motion.form>
      </FormProvider>
      <InstructionsDrawer
        open={open}
        onOpenChange={handleOpenDrawer}
        bookingInstructions={bookingInstructions}
      />
    </>
  );
};

export default AppointmentForm;
