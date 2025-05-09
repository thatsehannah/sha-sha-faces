"use client";

import EmptyResults from "@/components/global/EmptyResults";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { deleteTestimonialScreenshot } from "@/utils/actions";
import { TestimonialScreenshot } from "@prisma/client";
import { CircleX, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

type ManageTestimonialsProps = {
  testimonials: TestimonialScreenshot[];
};

const ManageTestimonials = ({ testimonials }: ManageTestimonialsProps) => {
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const [openDialog, setOpenDialog] = useState(false);
  const [testimonialToDelete, setTestimonialToDelete] =
    useState<TestimonialScreenshot>();

  const handleDeletePhoto = async (testimonial: TestimonialScreenshot) => {
    try {
      const resultMessage = await deleteTestimonialScreenshot(testimonial);

      toast({
        variant: "success",
        title: "Success ✅",
        description: resultMessage,
      });

      setOpenDialog(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh ☹️",
        description:
          error instanceof Error ? error.message : "An error occurred ",
      });
    }
  };

  return (
    <section id='testimonials'>
      <div className='bg-muted md:p-12 p-4 rounded-lg w-full'>
        <div className='flex justify-between items-center'>
          <p className='text-2xl font-medium'>Your Testimonials</p>
          <Button asChild>
            <Link href='/admin/add-testimonial'>
              {isMobile ? <Plus /> : "Add New Testimonial"}
            </Link>
          </Button>
        </div>
        <Separator className='my-6 bg-primary' />
        <div>
          {testimonials.length === 0 ? (
            <EmptyResults text='No testimonials as of right now.' />
          ) : (
            <ScrollArea className='h-[50rem] w-full bg-white'>
              <div className='lg:columns-3 columns-2 gap-4 space-y-4 mt-4 p-4'>
                {testimonials.map((testimonial) => (
                  <div
                    className='flex justify-center lg:justify-start gap-4'
                    key={testimonial.id}
                  >
                    <div className='relative'>
                      <div className='absolute -top-2 -right-2 hover:scale-125 hover:cursor-pointer transition-all ease-in-out'>
                        <CircleX
                          fill='white'
                          onClick={() => {
                            setTestimonialToDelete(testimonial);
                            setOpenDialog(true);
                          }}
                        />
                      </div>
                      <Image
                        src={testimonial.url}
                        alt={testimonial.alt}
                        className='rounded-sm border border-primary'
                        width={500}
                        height={500}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <ScrollBar orientation='horizontal' />
            </ScrollArea>
          )}
        </div>
      </div>
      <Dialog
        open={openDialog}
        onOpenChange={setOpenDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this testimonial?
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            This will remove the screenshot from your testimonials page.
          </DialogDescription>
          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => setOpenDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => handleDeletePhoto(testimonialToDelete!)}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ManageTestimonials;
