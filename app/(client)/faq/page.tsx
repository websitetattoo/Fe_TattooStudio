"use client";
import { useEffect, useState } from "react";

import HighlightText from "@/components/highlight-text";
import PageTitle from "@/components/page-title";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Data, Faq } from "@/app/types/type";
import { useGetDataFaq } from "@/app/query/faq/useGetAllFaq";

export default function Index() {
  const [faq, setFaq] = useState<Faq[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data, isLoading: loading } = useGetDataFaq();

  useEffect(() => {
    const dataFaq = (data as Data)?.data as Faq[];
    setFaq(dataFaq);
    setIsLoading(loading);
  }, [data, isLoading]);

  return (
    <main className="px-4 py-8 text-white sm:container sm:px-8">
      <PageTitle>
        <HighlightText className="font-bold uppercase tracking-wider">
          FAQ
        </HighlightText>
      </PageTitle>
      <div className="mx-auto w-full md:w-4/5 lg:w-3/5">
        <Accordion type="multiple" className="w-full">
          {faq?.map((q, idx) => (
            <AccordionItem value={idx + ""} key={idx}>
              <AccordionTrigger className="text-left text-lg md:px-4">
                {q.title}
              </AccordionTrigger>
              <AccordionContent className="text-justify text-tattoo-gray md:px-4">
                {q.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </main>
  );
}
