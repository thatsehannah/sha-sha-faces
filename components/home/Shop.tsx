import React from "react";
import { RightSectionTitle } from "../global/SectionTitles";

const Shop = () => {
  return (
    <section
      id='shop'
      className='relative h-[105vh]'
    >
      <RightSectionTitle
        title='shop'
        textClasses='text-tertiary'
        barClasses='bg-tertiary'
      />
      <div className='py-20 flex flex-col justify-center items-center m-auto bg-shop-gif bg-no-repeat bg-cover bg-origin-padding bg-top w-full h-full mx-0 px-0 '>
        <div className='p-4 lg:p-8 rounded-lg bg-black/30 backdrop-blur-lg shadow-none lg:shadow-2xl'>
          <span
            className={`text-4xl lg:text-5xl font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary`}
          >
            Shop Coming 🔜
          </span>
        </div>
      </div>
    </section>
  );
};

export default Shop;
