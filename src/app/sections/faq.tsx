import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Props = {};
type ItemProps = {
  title: string;
  content: string;
  keyValue: string;
};

const FAQItem = ({ title, content, keyValue }: ItemProps) => {
  return (
    <AccordionItem value={keyValue}>
      <AccordionTrigger>{title}</AccordionTrigger>
      <AccordionContent>{content}</AccordionContent>
    </AccordionItem>
  );
};

export const FAQ = (props: Props) => {
  return (
    <Accordion type="single" collapsible>
      <FAQItem
        title="Holy Baptism"
        content="Yes. It adheres to the WAI-ARIA design pattern."
        keyValue="item-1"
      />
      <FAQItem
        title="Confirmation Classes"
        content="Yes. It adheres to the WAI-ARIA design pattern."
        keyValue="item-2"
      />
      <FAQItem
        title="Becoming a Member of Corpus Christi"
        content="Yes. It adheres to the WAI-ARIA design pattern."
        keyValue="item-3"
      />
      <FAQItem
        title="Getting Married"
        content="Yes. It adheres to the WAI-ARIA design pattern."
        keyValue="item-4"
      />
      <FAQItem
        title="Death in the Family"
        content="Yes. It adheres to the WAI-ARIA design pattern."
        keyValue="item-4"
      />
    </Accordion>
  );
};
