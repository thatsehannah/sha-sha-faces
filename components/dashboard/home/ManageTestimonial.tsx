import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";

const ManageTestimonial = () => {
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
      </div>
    </section>
  );
};

export default ManageTestimonial;
