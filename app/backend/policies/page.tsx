import BreadCrumb from "@/components/breadcrumb";
import { PoliciesClient } from "@/components/tables/policy-tables/policies";
import http from "@/lib/http";
import { Policies } from "@/constants/data";

const breadcrumbItems = [{ title: "Policies", link: "/backend/policies" }];
export default async function Index() {
  const response = await http.get("/policies");
  const policies = response.data as Policies[];

  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <PoliciesClient data={policies} />
      </div>
    </>
  );
}
