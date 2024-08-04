"use client";
//Library
import { useEffect, useState } from "react";
import HighlightText from "@/components/highlight-text";
//
import PageTitle from "@/components/page-title";
import PoliciesComp from "./_components/Policies";
//Query
import { useGetDataPolicies } from "@/app/query/policies/useGetAllPolices";
//Types
import { Data, Policies } from "@/app/types/type";

export default function index() {
  const artPolicyTitle =
    "At Florida Kings Tattoo, We try to keep our polices simple so the focus can remain on the art. However, we do need  to have policies in place to ensure fair treatment for all customers.";

  const [policies, setPolicies] = useState<Policies[]>([]);
  const { data, isLoading: loading } = useGetDataPolicies();

  useEffect(() => {
    const dataPolicy = (data as Data)?.data as Policies[];
    setPolicies(dataPolicy);
  }, [data]);

  return (
    <div className="bg-tattoo-color-bg">
      <div className="w-full py-12 lg:m-auto lg:w-9/12">
        <div className="pb-16 md:pb-8 lg:pb-20">
          <PageTitle>
            <HighlightText className="font-bold">POLICIES</HighlightText>
          </PageTitle>
        </div>
        <div className="px-4 md:px-0">
          <div className="pb-4 md:flex md:items-center md:justify-center">
            <div className="text-center text-xl text-white md:w-9/12 md:pb-8 lg:w-full lg:text-2xl">
              {artPolicyTitle}
            </div>
          </div>

          <div className="pb-12 text-left md:m-auto md:w-9/12 md:pt-4 lg:w-full">
            {policies?.map((item, index) => (
              <PoliciesComp key={index} obj={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
