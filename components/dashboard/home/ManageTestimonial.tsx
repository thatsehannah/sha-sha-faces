import EmptyResults from "@/components/global/EmptyResults";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { fetchAllTestimonials } from "@/utils/actions";
import Link from "next/link";
import React from "react";

const ManageTestimonial = async () => {
  const testimonials = await fetchAllTestimonials();

  return (
    <section>
      <div className='bg-muted p-12 rounded-lg w-full'>
        <div className='flex justify-between'>
          <p className='text-2xl font-medium'>Your Testimonials</p>
          <Button asChild>
            <Link href='/admin/add-testimonial'>Add New Testimonial</Link>
          </Button>
        </div>
        <Separator className='my-6 bg-primary' />
        <div>
          {testimonials.length === 0 && (
            <EmptyResults text='No testimonials as of right now.' />
          )}
        </div>
      </div>
    </section>
  );
};

export default ManageTestimonial;
