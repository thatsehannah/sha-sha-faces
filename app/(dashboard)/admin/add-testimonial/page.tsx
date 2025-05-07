import UploadTestimonalForm from "@/components/dashboard/home/UploadTestimonalForm";
import Container from "@/components/global/Container";
import { Separator } from "@/components/ui/separator";
import React from "react";

const page = () => {
  return (
    <main>
      <Container className='py-20 w-screen'>
        <div>
          <p className='text-3xl lg:text-5xl font-normal mb-2'>
            Upload Testimonials
          </p>
          <Separator className='mb-4' />
          <UploadTestimonalForm />
        </div>
      </Container>
    </main>
  );
};

export default page;
