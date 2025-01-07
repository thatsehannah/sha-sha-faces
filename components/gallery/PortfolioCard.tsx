import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const PortfolioCard = ({ title }: { title: string }) => {
  return (
    <article className='group relative'>
      <Link href={`/gallery/${title}`}>
        <div className='flex justify-center items-center h-[18rem] lg:h-screen transform group-hover:shadow-xl group-hover:scale-105 transition-transform duration-300'>
          <Image
            priority
            className='rounded w-full object-cover transform group-hover:brightness-95  duration-300 brightness-50'
            src={`/images/${title}.jpg`}
            alt={`${title} image`}
            fill
            sizes='(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw'
          />
          <p className='text-center capitalize z-10 text-5xl text-white bg-primary font-semibold p-4 rounded-md'>
            {title}
          </p>
        </div>
      </Link>
    </article>
  );
};

export default PortfolioCard;
