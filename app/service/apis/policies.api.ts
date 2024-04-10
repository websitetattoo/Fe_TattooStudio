import { filterPolicesData } from "@/app/types/type";
import { get } from "@/lib/http";

const pathUrl = "/policies/";

export const getAllPolicies = async (filterData: filterPolicesData) => {
  const { page, pageSize, keyWord, sort, top } = filterData;
  let url = `${pathUrl}?`;

  if (page !== undefined && pageSize !== undefined) {
    url += `page=${page}&limit=${pageSize}&`;
  }

  if (keyWord !== undefined) {
    url += `title=${keyWord}&`;
  }

  if (top !== undefined) {
    url += `limit=${top}&`;
  }

  if (sort !== undefined) {
    url += `sort=${sort}`;
  }
  const result = await get(url);
  return result.data;
};

export const getPolicesById = async (id: string) => {
  const result = await get(`${pathUrl}${id}`);
  return result.data;
};
