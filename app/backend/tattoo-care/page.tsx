// "use client";
// //Libary
// import React, { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// //Components
// import BreadCrumb from "@/components/breadcrumb";
// import { PolicyForm } from "@/components/forms/policy-form";

// import http from "@/lib/http";
// import { Tattoocare } from "../types/type";

// export default function Page() {
//   const params = useParams();
//   const [initialData, setInitialData] = useState<Tattoocare | null>(null);
//   const breadcrumbItems = [
//     { title: "Tattoocare", link: "/backend/tattoocare" },
//     { title: "Update", link: "#" },
//   ];

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await http.get(`/tattoocare/${params.id}`);
//         const data = response.data as Tattoocare;
//         setInitialData(data);
//       } catch (error) {
//         console.error("Error fetching tattoocare:", error);
//         return null;
//       } finally {
//       }
//     };
//     fetchData();
//   }, [params.id]);

//   return (
//     <div className="flex-1 space-y-4 p-8">
//       <BreadCrumb items={breadcrumbItems} />
//       <PolicyForm initialData={initialData} key={null} />
//     </div>
//   );
// }
