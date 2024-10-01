import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HeaderText, SubHeaderText } from "@/shared/components/headerText";

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
    <section className="py-10" id="services">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-5 space-y-2">
          <SubHeaderText text="Frequently Asked Questions" />
          <HeaderText text="FAQ" className="text-gray-800" />
          <SubHeaderText text="Find answers to common questions and information about church activities " />
        </div>

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
            keyValue="item-5"
          />
        </Accordion>
      </div>
    </section>
  );
};
