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
import React from 'react';

type ServiceCardProps = {
  service: {
    name: string;
    price: number;
    duration: number;
    description: string;
    popular: boolean;
  };
};

const ServicesCard = ({ service }: ServiceCardProps) => {
  return (
    <article>
      <Card className='flex flex-col justify-between h-full'>
        <CardHeader>
          <CardTitle className='capitalize flex justify-between text-2xl text-left font-semibold'>
            {service.name}
            {service.popular && (
              <Star
                fill='gold'
                strokeWidth={0}
              />
            )}
          </CardTitle>
          <CardDescription className='text-lg text-right'>
            <div className='flex justify-between'>
              <p>
                {service.duration} hour{service.duration === 1 ? '' : 's'}{' '}
              </p>
              <p>${service.price}</p>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className='font-light'>
          <div className='h-full'>{service.description}</div>
        </CardContent>
        <CardFooter className=''>
          <Button>Book Now</Button>
        </CardFooter>
      </Card>
    </article>
  );
};

export default ServicesCard;
