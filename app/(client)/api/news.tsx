import { News } from "@/components/tables/news-tables/type/news";
import http from "@/lib/http";

// Adjust the return type to match PaginatedData<News[]>
export async function fetchNews(): Promise<{ pages: News[] }> {
  const response = await http.get("/news");
  const data = await response.data;
  return { pages: [data] }; // Wrap the data in an array and assign it to the 'pages' property
}

// Adjust the return type to match PaginatedData<News[]>
export async function prefetchNews(): Promise<{ pages: News[] }> {
  // Perform pre-fetching logic, for example:
  const response = await http.get("/news");
  const data = await response.data;
  return { pages: [data] }; // Wrap the data in an array and assign it to the 'pages' property
}
