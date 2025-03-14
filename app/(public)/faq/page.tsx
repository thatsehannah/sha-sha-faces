import FaqCard from "@/components/faq/FaqCard";
import Container from "@/components/global/Container";
import { LeftSectionTitle } from "@/components/global/SectionTitles";
import { faqs } from "@/utils/faqs";
import React from "react";

const FaqPage = () => {
  return (
    <main>
      <div className='relative bg-faq-bg bg-no-repeat bg-cover bg-bottom h-96 w-full'>
        <LeftSectionTitle
          title='frequently asked questions'
          textClasses='text-tertiary text-3xl font-bold'
          barClasses='bg-tertiary'
        />
      </div>
      <Container className='py-20 grid grid-cols-1 gap-8'>
        {faqs.map((item, idx) => (
          <div key={idx}>
            <FaqCard
              faq={item}
              index={idx.toString()}
            />
          </div>
        ))}
      </Container>
    </main>
  );
};

export default FaqPage;
