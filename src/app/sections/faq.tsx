import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/accordion";
import { HeaderText, SubHeaderText } from "@/shared/components/headerText";

type ItemProps = {
  title: string;
  content: string;
  keyValue: string;
};

const FAQItem = ({ title, content, keyValue }: ItemProps) => {
  return (
    <AccordionItem value={keyValue}>
      <AccordionTrigger className="text-start">{title}</AccordionTrigger>
      <AccordionContent className="text-start whitespace-pre-line">{content}</AccordionContent>
    </AccordionItem>
  );
};

export const FAQ = () => {
  return (
    <section className="py-10" id="faq">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-5 space-y-2">
          <SubHeaderText text="Frequently Asked Questions" />
          <HeaderText text="FAQ" />
          <SubHeaderText text="Find answers to common questions and information about church activities " />
        </div>

        <Accordion type="single" collapsible>
          <FAQItem
            title="Holy Baptism"
            content={`Baptism is an outward, visible sign of an inward, hidden grace gifted to us by God through the Holy Spirit during the act of baptism. Baptism is identification with Jesus Christ in His Paschal Mystery.\n\nHoly Baptism is offered via a series of Baptism classes bi-annually to infants of parents and guardians, who are regular and active in the life of Corpus Christi Anglican Church, Garsfontein. Please note that you need to be an active member of the parish of Corpus Christi, Garsfontein, and as such, registered on the parish roll.\n\nWe believe that it is the responsibility of parents and guardians, together with the church, to bring their child/ward up in the Christian faith. It is a most important sacrament and a huge responsibility to parent and godparents, tasked with the preparation of children towards a life based upon the sacrament of Baptism, representing spiritual rebirth, as explained by Jesus to Nicodemus (John 3:1-8).  Therefore, it is imperative that parents (or guardians) and godparents be faithful Christians to make a meaningful impact on their children/wards, and they need to attend the course (all 4 weeks).\n\nApplication Forms are available at the church for completion. A series of Baptism Preparation classes are held to assist in the nurture and care of your child/ward in the Christian faith. The courses are held over Lent (before Easter)  and Spring (September/October) each year over 4 weeks, with the subsequent service of Baptism following the 4th or 5th weekend (In Easter, it is usually held during the Service of Light on Easter Saturday at Corpus Christi). Adult baptism preparation classes are also held to welcome adults into the church through Baptism. Please speak to the priest to discuss your baptism requirements, or contact the parish office.`}
            keyValue="item-1"
          />
          <FAQItem
            title="Confirmation Classes"
            content={`The confirmation candidate makes a response of faith, an act of commitment to Christ, by making or renewing the baptismal promises.\n\nConfirmation classes are run at Corpus Christi over a 2 year period. The candidates are drawn from the senior class of the Children's Ministry. At the senior class they are given preparation, through Bible Study, for a 2 year period towards confirmation, with the confirmation service happening towards the end of the 2nd year, when the Bishop of this Diocese confirms the confirmation candidate.\n\nDiocesan policy in general is that the candidate must be 14 years or older to be confirmed. When considering booking your child for confirmation, please note that you will need to alert the parish office of your intention to have your child confirmed in the year that a current course is being completed, so that planning and preparation for the new intake of confirmands can be done.`}
            keyValue="item-2"
          />
          <FAQItem
            title="Becoming a Member of Corpus Christi"
            content={`He is like a tree planted by streams of water that yields its fruit in its season, and its leaf does not wither. In all that he does, he prospers (Ps 1 v 3).\n\nWe invite you to take your place among the many that have made this their spiritual home, discovered their spiritual gifts and are serving God with passion and purpose. Our services are open to everyone. We welcome you and encourage you to introduce yourselves to the clergy and/or the sides-persons. State your intention, whether it be as a visitor or seeking active membership. If you wish to join the parish please go to DOWNLOADS page & download the membership PDF to complete & return to the parish office. PLEASE NOTE that you cannot become a member of the parish until these forms have been completed and your name and the details of your family have been captured to the Parish Roll. \nPlease give consideration to what you are prepared to contribute to our church. We welcome willingly given Christian stewardship and recognize the provision of "talents" as a gift both in the monetary form, and in the provision of particular skills. We welcome both. Please know that a church needs sufficient of each form of talent to be able to serve its community properly, and to provide the necessary spirituality and Christian "food" upon which we all feed.`}
            keyValue="item-3"
          />
          <FAQItem
            title="Getting Married"
            content={`…'Therefore a man shall leave his father and his mother and hold fast to his wife, and the two shall become one flesh'… (Mat 19 v 5).\n\nBefore any arrangements are made, please contact the clergy or the  parish office and advise them timeously of your intention. There are certain necessary policies put in place regarding marriages and we would love you to be aware of this before making any arrangements. We rejoice with you in taking this sacred step towards marriage. Forms are available at church. Please arrange to speak to the incumbent priest about this. Please take note of the below-mentioned, important guidelines, in respect of marriage.\n\nIn brief:\n• We marry members of OUR congregation (as governed by the Marriage Act) or by special request from other ministers.\n• Divorced persons – bishop's permission and counseling required.\n• Unbaptized persons – necessary arrangements and bishop's permission.\n• No marriages in 'commercial' chapels – only in consecrated churches.`}
            keyValue="item-4"
          />
          <FAQItem
            title="Death in the Family"
            content={`Blessed are those who mourn, for they shall be comforted (Mat 5 v 4).\n\nPlease contact the clergy (or the parish office) as soon as possible in the event that a death occurs in the family or in the parish community, particularly should you wish the clergy to conduct a funeral service. No arrangements are to be made prior to meeting the clergy and confirming their availability. Our first responsibility is to show due care and comfort to the dying and those who are bereaved. We are most willing to offer counselling through our trained counselors. It is also our desire to offer counselling and care to the sick and dying when approached to do so.`
            }
            keyValue="item-5"
          />
        </Accordion>
      </div>
    </section>
  );
};
