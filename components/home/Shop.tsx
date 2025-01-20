import React from 'react';
import SectionTitle from '../global/SectionTitle';

const Shop = () => {
  return (
    <section className='relative h-[85vh]'>
      <SectionTitle
        title='shop'
        alignment='right'
      />
      <div className='py-20 flex justify-center items-center m-auto bg-shop bg-cover bg-center w-full h-full mx-0 px-0 dark:bg-black dark:bg-blend-overlay dark:bg-opacity-40'>
        <div className='border-2 border-foreground p-6 rounded-lg bg-background shadow-none lg:shadow-2xl'>
          <p className='text-5xl lg:text-6xl text-foreground'>Shop Coming 🔜</p>
        </div>
      </div>
    </section>
  );
};

export default Shop;
