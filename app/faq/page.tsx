"use client";
import { useState } from "react";

import HighlightText from "@/components/highlight-text";
import PageTitle from "@/components/page-title";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface QuestionInterface {
  title: string;
  content: string;
}

const list = [
  {
    title: "How much does a tattoo cost?",
    content: `Minimum costs differ per artist. 
    Each artist has a base cost and are not hourly. 
    Exact cost of the tattoo will depend on the artist, the size and 
    the complexity of the design, including other factors. 
    We provide a quote in the consultation portion, and the final price 
    is subject to change if there are any drastic changes in size or a 
    complete design change.`,
  },
  {
    title: "Will you tattoo the design that I bring to the studio?",
    content: `
Not necessarily. While we take pride in working with our clients to create a tattoo that brings their vision to life, not all designs are suitable for this medium. Another artist in our studio may be suggested if the design is more fitting for them. Any designs that include elements that our artists are not comfortable producing - for example, racist words or imagery - will not be allowed.
    `,
  },
  {
    title: "When will I see my design and make any changes/ correction?",
    content: `In most cases, designs will be sent 1 day prior to your appointment. You may request small changes to the design for the artist to make adjustments prior to the appointment. Complete design or theme changes must be informed no later than 1 week prior to the appointment for the artist to have enough time to redesign, otherwise the appointment will be stated as a cancellation and a new deposit will be required.`,
  },

  {
    title: "How bad does it hurt to get a tattoo?",
    content: `As everyone’s pain tolerance is different, it’s difficult to have a one range answer. While there is some discomfort experienced during the process, most clients feel that the resulting tattoo is well worth the process. There are many first time tattoo clients who state that it was much better than anticipated. Larger pieces that take all day may create discomfort in the 4th-5th hour.`,
  },
  {
    title: "Can I use numbing cream for my appointment",
    content: `We prohibit using a third-party numbing cream due to risks and reactions it may cause on the client. We believe that it is best not to use additional products on the skin during the tattoo process for the best results.`,
  },
  {
    title: "Are there any aftercare requirements when getting a tattoo?",
    content: `Yes, it’s extremely important to treat your new tattoo properly in the days after completion. To learn more about good aftercare practices, please visit our aftercare page.`,
  },

  {
    title: "Can people with health conditions get tattoos?",
    content: `There are some health conditions that may be dangerous for an individual to be tattooed. These include immune system problems that limit your body’s ability to heal itself. If pregnant, please consult with your doctor before reaching out. If you are in doubt about how a condition you have may impact your ability to get a tattoo, please speak directly with your healthcare provider before going any further.`,
  },
  {
    title: "Do you do touch-ups? When do I need a touch-up?",
    content: `The artist will meticulously evaluate the need for touch-ups to ensure the best possible results. To assist in this process, please include well-lit photo images for the artist's reference in your email inquiry. Touch-ups can be scheduled approximately 1.5 months after your initial session and are complimentary if deemed necessary by the artist during the first 6 months. However, for touch-ups conducted after 6 months from the initial session, a nominal fee of $100 will apply, and a non-refundable $50 deposit is essential to secure your appointment. Should a touch-up be deemed necessary, the appointment will be scheduled based on the artist's availability for your convenience.`,
  },
];

export default function Index() {
  const [questions, setQuestions] = useState<QuestionInterface[]>(list);

  return (
    <>
      <PageTitle>
        <HighlightText className="font-bold uppercase tracking-wider">
          FAQ
        </HighlightText>
      </PageTitle>
      <div className="container px-4 py-8 text-white sm:px-8">
        <div className="mx-auto w-full md:w-4/5 lg:w-3/5">
          <Accordion type="multiple" className="w-full">
            {questions.map((q, idx) => (
              <AccordionItem value={idx + ""} key={idx}>
                <AccordionTrigger className="text-left md:px-4">
                  {q.title}
                </AccordionTrigger>
                <AccordionContent className="text-gray text-justify md:px-4">
                  {q.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </>
  );
}
