import Container from "@/components/global/Container";
import { LeftSectionTitle } from "@/components/global/SectionTitles";
import ReviewForm from "@/components/review/ReviewForm";
import { fetchServiceInfo } from "@/utils/actions";
import React from "react";

const NewReviewPage = async () => {
  const serviceNamesId = await fetchServiceInfo();
  const serviceNames = serviceNamesId.map((s) => s.name);

  return (
    <main className='relative'>
      <LeftSectionTitle
        title='leave a review'
        textClasses='dark:text-tertiary'
        barClasses='dark:bg-tertiary'
      />
      <Container className='py-20'>
        <p className='mb-8 text-4xl font-bold'>
          I&#39;d Love to Hear From You!
        </p>
        <p className='mb-6 font-light text-xl'>
          Your feedback is important to me! If you enjoyed my makeup services,
          let me know by leaving a review. Your words not only help me improve
          but also guide others in finding the perfect beauty experience.
          Whether it&#39;s a soft glam or a bold transition, I&#39;d love to
          hear about your experience.
        </p>
        <p className='mb-6 font-light text-xl'>
          Thank you for your support 🫶🏿.
        </p>
        <ReviewForm serviceNames={serviceNames} />
      </Container>
    </main>
  );
};

export default NewReviewPage;
