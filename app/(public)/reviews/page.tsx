import Container from "@/components/global/Container";
import { LeftSectionTitle } from "@/components/global/SectionTitles";
import ReviewContainer from "@/components/review/ReviewContainer";
import TestimonialContainer from "@/components/review/TestimonialContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

const ReviewsPage = async () => {
  return (
    <main className='relative'>
      <LeftSectionTitle title='praise' />
      <Container className='py-20'>
        <Tabs
          defaultValue='reviews'
          className='place-items-center'
        >
          <TabsList className='h-12 w-3/4 grid grid-cols-2 mb-8 bg-tertiary'>
            <TabsTrigger
              value='reviews'
              className='text-lg font-bold data-[state="active"]:bg-primary data-[state="active"]:text-primary-foreground text-primary'
            >
              Reviews
            </TabsTrigger>
            <TabsTrigger
              value='testimonials'
              className='text-lg font-bold data-[state="active"]:bg-primary data-[state="active"]:text-primary-foreground text-primary'
            >
              Testimonials
            </TabsTrigger>
          </TabsList>
          <TabsContent value='reviews'>
            <ReviewContainer />
          </TabsContent>
          <TabsContent value='testimonials'>
            <TestimonialContainer />
          </TabsContent>
        </Tabs>
      </Container>
    </main>
  );
};

export default ReviewsPage;
