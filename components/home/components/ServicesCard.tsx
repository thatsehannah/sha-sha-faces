'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Star } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import { Service } from '@prisma/client';

type ServiceCardProps = {
  service: Service;
};

const ServicesCard = ({ service }: ServiceCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: -100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: service.id * 0.2 }}
      viewport={{ once: true, amount: 0.5 }}
      exit={{ opacity: 0, y: 100 }}
    >
      <Card className='flex flex-col justify-between h-full'>
        <CardHeader>
          <CardTitle className='capitalize flex justify-between text-2xl text-left font-semibold'>
            {service.name}
            <Star
              fill='gold'
              strokeWidth={0}
            />
          </CardTitle>
          <CardDescription className='text-lg text-right'>
            <div className='flex justify-between'>
              <p>{service.duration}</p>
              <p>${service.price}</p>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className='font-light'>
          <div className='h-full'>{service.description}</div>
        </CardContent>
        <CardFooter className=''>
          <Button
            className='bg-secondary text-md'
            asChild
          >
            <Link href={`/contact?a=${service.id}`}>Book Now</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.article>
  );
};

export default ServicesCard;
