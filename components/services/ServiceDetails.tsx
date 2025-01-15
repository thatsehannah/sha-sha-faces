import React from 'react';
import ServiceIconSvg from './ServiceIconSvg';
import { Banknote, Clock, Star } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

type ServiceDetailsProps = {
  index: number;
  service: {
    name: string;
    price: number;
    duration: number;
    description: string;
    popular: boolean;
    svg: {
      // svgs from uxwing.com
      pathData: string;
      properties: {
        [key: string]: string | undefined;
      };
    };
  };
};

const ServiceDetails = ({ service, index }: ServiceDetailsProps) => {
  const { name, price, duration, description, popular, svg } = service;

  const detailsBackground =
    index % 2 === 0 ? 'bg-gradient-to-br' : 'bg-gradient-to-tr';

  return (
    <article className='flex lg:flex-row flex-col lg:even:flex-row-reverse mb-16 lg:mb-0 last:mb-8 lg:gap-0 shadow-lg lg:shadow-none'>
      <div className='lg:w-1/2 lg:h-[80vh] flex justify-center items-center'>
        <div className='hidden lg:flex relative w-full h-full justify-center items-center py-8 lg:py-0'>
          <ServiceIconSvg
            svg={svg}
            className='fill-primary'
          />
        </div>
      </div>
      <div
        className={`lg:w-1/2 lg:h-[80vh] flex bg-fixed ${detailsBackground} rounded-lg xl:rounded-none from-tertiary via-accent to-tertiary`}
      >
        <div className='flex flex-col lg:p-12 p-8'>
          <div className='lg:hidden flex justify-center items-center mb-8'>
            <ServiceIconSvg
              svg={svg}
              className='fill-primary'
            />
          </div>
          <div className='mb-6'>
            <p className='capitalize text-3xl lg:text-4xl font-bold'>{name}</p>
            {popular && (
              <div className='flex gap-2 mt-1'>
                <Star
                  fill='gold'
                  strokeWidth={0}
                />
                <p className='uppercase'>popular service</p>
              </div>
            )}
          </div>
          <div className='flex justify-between text-2xl mb-12'>
            <div className='flex gap-3 p-4 rounded-full bg-accent font-bold shadow-md'>
              <Clock />
              <p className='text-xl'>{duration} hours</p>
            </div>
            <div className='flex gap-3 p-4 rounded-full bg-accent font-bold shadow-md'>
              <Banknote
                size={20}
                className='transform rotate-45'
              />
              <p className='text-xl'>${price}</p>
            </div>
          </div>

          <p className='text-2xl font-light mb-12'>{description}</p>
          <Button
            className='mt-auto capitalize text-xl bg-secondary'
            asChild
          >
            <Link href={`/contact?a=${index}`}>book a time</Link>
          </Button>
        </div>
      </div>
    </article>
  );
};

export default ServiceDetails;
