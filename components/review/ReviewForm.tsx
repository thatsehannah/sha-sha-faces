'use client';

import { reviewSchema } from '@/utils/reviewSchema';
import { Review } from '@/utils/types';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import FormInput from '../form/FormInput';
import FormDropdown from '../form/FormDropdown';
import FormRadioGroup from '../form/FormRadioGroup';
import Rating from './Rating';

type ReviewFormProps = {
  serviceNames: string[];
};

const ReviewForm = ({ serviceNames }: ReviewFormProps) => {
  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      reviewer: '',
      email: '',
      comment: '',
      wouldRecommend: undefined,
      service: '',
      rating: '',
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
            <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-8'>
              <FormInput
                name='reviewer'
                label='Name'
                placeholder='e.g. Jane Doe'
              />
              <FormInput
                name='email'
                label='Email'
                placeholder='e.g. janedoe@gmail.com'
              />
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-8'>
              <FormDropdown
                name='service'
                label='Service'
                values={serviceNames}
                placeholder='Select a service'
              />
              <Rating name='rating' />
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-8'>
              <FormInput
                name='comment'
                label='Review'
                type='textarea'
              />
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
