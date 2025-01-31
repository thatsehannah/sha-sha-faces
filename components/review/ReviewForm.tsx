'use client';

import { reviewSchema } from '@/utils/reviewSchema';
import { Review } from '@/utils/types';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { FormProvider, useForm } from 'react-hook-form';
import { Label } from '../ui/label';
import { Star } from 'lucide-react';
import { Button } from '../ui/button';
import FormInput from '../form/FormInput';
import FormDropdown from '../form/FormDropdown';
import { getServiceNames } from '@/lib/utils';
import FormRadioGroup from '../form/FormRadioGroup';

const ReviewForm = () => {
  const serviceNames = getServiceNames();

  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      reviewer: '',
      email: '',
      comment: '',
      wouldRecommend: false,
      service: '',
      starCount: 5,
    },
  });

  const handleOnSubmit = async (values: Review) => {
    console.log(values);
  };

  return (
    <>
      <FormProvider {...form}>
        <motion.form
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          className='w-full'
          onSubmit={form.handleSubmit(handleOnSubmit)}
        >
          <section className='bg-gradient-to-bl from-soft-pink to-secondary rounded-md p-8 lg:px-20 lg:py-8 drop-shadow-2xl'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
              <FormInput
                name='name'
                label='Name'
                placeholder='e.g. Jane Doe'
              />
              <FormInput
                name='email'
                label='Email'
                placeholder='e.g. janedoe@gmail.com'
              />
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
              <FormDropdown
                name='service'
                label='Service'
                values={serviceNames}
                placeholder='Select a service'
              />
              <div>
                <Label className='text-black text-lg'>Rating</Label>
                <div className='group flex flex-row gap-2 mt-2'>
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      size={30}
                      className='hover:fill-yellow-300 stroke-black'
                      strokeWidth={1}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
              <FormInput
                name='review'
                label='Review'
                type='textarea'
              />
              {/* Add radio group for yes or no here */}
              <FormRadioGroup
                name='wouldRecommend'
                label='Would you recommend my services?'
              />
            </div>
            <Button type='submit'>Submit Review</Button>
          </section>
        </motion.form>
      </FormProvider>
    </>
  );
};

export default ReviewForm;
