import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const PortfolioCard = ({ title }: { title: string }) => {
  return (
    <article className='group relative'>
      <Link href={`/gallery/${title}`}>
        <Card className='h-[35rem]'>
          <CardContent className='p-6'>
            <div className='relative h-[28rem] transition ease-linear hover:opacity-35 hover:scale-105'>
              <Image
                priority
                className='rounded w-full object-cover'
                src={`/images/${title}.jpg`}
                alt={`${title} image`}
                fill
                sizes='(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw'
              />
            </div>
            <div className='text-center mt-4'>
              <p className='text-2xl font-bold capitalize'>
                {title} gallery &gt;
              </p>
            </div>
          </CardContent>
        </Card>
      </Link>
    </article>
  );
};

export default PortfolioCard;