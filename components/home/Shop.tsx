import React from 'react';
import SectionTitle from '../global/SectionTitle';

const Shop = () => {
  return (
    <section className='relative h-[105vh]'>
      <SectionTitle
        title='shop'
        alignment='right'
      />
      <div className='py-20 flex flex-col justify-center items-center m-auto bg-shop-gif bg-no-repeat bg-cover bg-origin-padding bg-top w-full h-full mx-0 px-0 dark:bg-black dark:bg-blend-overlay dark:bg-opacity-40'>
        <div className='p-4 lg:p-8 rounded-lg bg-black/30 backdrop-blur-lg shadow-none lg:shadow-2xl'>
          <span
            className={`text-5xl lg:text-6xl font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary`}
          >
            Shop Coming 🔜
          </span>
        </div>
      </div>
    </section>
  );
};

export default Shop;
