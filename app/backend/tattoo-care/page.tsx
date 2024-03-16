import BreadCrumb from "@/components/breadcrumb";
import { PoliciesClient } from "@/components/tables/policy-tables/policies";
import axios from "axios";

const breadcrumbItems = [{ title: "Policies", link: "/backend/policies" }];
export default async function Index() {
  // Fetch policies from the backend server
  const response = await axios.get("http://localhost:3001/policies/");
  const policies = response.data; // Extract policies from the response

  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <PoliciesClient data={policies} />
      </div>
    </>
  );
}
