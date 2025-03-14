import { Faq } from "@/utils/types";
import React from "react";
import { Card, CardContent } from "../ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

type FaqCardProps = {
  faq: Faq;
  index: string;
};

const FaqCard = ({ faq, index }: FaqCardProps) => {
  return (
    <Card className='bg-tertiary'>
      <CardContent>
        <Accordion
          type='single'
          collapsible
          className='w-full'
        >
          <AccordionItem
            value={index}
            className='border-b-primary'
          >
            <AccordionTrigger className='text-xl font-bold text-primary hover:no-underline'>
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className='text-lg text-black'>
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default FaqCard;
