import BreadCrumb from "@/components/breadcrumb";
import { PoliciesClient } from "@/components/tables/policy-tables/policies";
import { policies } from "@/constants/data";

const breadcrumbItems = [{ title: "User", link: "/dashboard/user" }];
export default function Index() {
  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <PoliciesClient data={policies} />
      </div>
    </>
  );
}
