import { fetchAllTestimonials } from "@/utils/actions";
import Image from "next/image";
import React from "react";
import EmptyResults from "../global/EmptyResults";

const TestimonialContainer = async () => {
  const testimonials = await fetchAllTestimonials();

  return (
    <section>
      <p className='text-xl'>
        Explore the heartfelt feedback I&apos;ve received from my clients!
      </p>
      {testimonials.length === 0 && (
        <div className='mt-6'>
          <EmptyResults text='No testimonials as of right now.' />
        </div>
      )}
      <div className='columns-2 xl:columns-4 gap-4 space-y-4 mt-6'>
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className='bg-gradient-to-r from-tertiary via-white to-tertiary flex justify-center items-center p-2 rounded-lg'
          >
            <Image
              key={testimonial.id}
              src={testimonial.url}
              alt={testimonial.alt}
              width={400}
              height={400}
              className='rounded-lg'
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialContainer;
