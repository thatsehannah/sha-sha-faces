'use client';

import { reviewSchema } from '@/utils/reviewSchema';
import { Review } from '@/utils/types';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { z } from 'zod';
import { Form } from '../ui/form';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectTrigger, SelectValue } from '../ui/select';
import { Star } from 'lucide-react';
import { Button } from '../ui/button';

const ReviewForm = () => {
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
      <Form {...form}>
        <motion.form
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          className='w-full'
          onSubmit={form.handleSubmit(handleOnSubmit)}
        >
          <section className='bg-gradient-to-bl from-soft-pink to-secondary rounded-md p-8 lg:px-20 lg:py-8 drop-shadow-2xl'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
              <div>
                <Label>Name</Label>
                <Input></Input>
              </div>
              <div>
                <Label>Email</Label>
                <Input></Input>
              </div>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2'>
              <div>
                <Label>Service</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </Select>
              </div>
              <div>
                <Label>Rating</Label>
                <div className='flex flex-row gap-2'>
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      size={30}
                      className='hover:fill-yellow-300'
                      strokeWidth={1}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2'>
              <div>
                <Label>Review</Label>
                <Textarea></Textarea>
              </div>
              <div>
                <Label>Would you recommend me?</Label>
                {/* Add radio group for yes or no here */}
                <div className='flex gap-2'>
                  <p>yes</p>
                  <p>no</p>
                </div>
              </div>
            </div>
            <Button type='submit'>Submit Review</Button>
          </section>
        </motion.form>
      </Form>
    </>
  );
};

export default ReviewForm;
