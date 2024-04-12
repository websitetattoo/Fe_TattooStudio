"use client";
//Library
import { useEffect, useState } from "react";
import HighlightText from "@/components/highlight-text";
//
import PageTitle from "@/components/page-title";
import PoliciesComp from "./_components/Policies";
import { Policies } from "@/app/types/type";
import { get } from "@/lib/http";

export default function index() {
  const artPolicyTitle =
    "At Florida Kings Tattoo, We try to keep our polices simple so the focus can remain on the art. However, we do need  to have policies in place to ensure fair treatment for all customers.";

  const [policies, setPolicies] = useState<Policies[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get("/policies");
        const data = response.data as Policies[];
        setPolicies(data);
      } catch (error: any) {
        alert(error.message);
      }
    };

    fetchData(); // Gọi hàm fetchData khi component được mount
  }, []);
  return (
    <div className="bg-tattoo-color-bg">
      <div className="w-full py-12 lg:m-auto lg:w-9/12">
        <div className="pb-16 md:pb-8 lg:pb-20">
          <PageTitle>
            <HighlightText className="font-bold">POLICIES</HighlightText>
          </PageTitle>
        </div>
        <div className="px-12 md:px-0">
          <div className="pb-16 md:flex md:items-center md:justify-center">
            <div className="text-center text-xl text-white md:w-9/12 md:pb-8 lg:w-full lg:text-2xl">
              {artPolicyTitle}
            </div>
          </div>

          <div className="text-left md:m-auto md:w-9/12 md:py-12 lg:w-full">
            {policies?.map((item, index) => (
              <PoliciesComp key={index} obj={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
