import { filterData } from "@/app/types/type";
import { get, put } from "@/lib/http";

const pathUrl = "/user/";

export const getUser = async (filterData?: filterData) => {
  if (!filterData) {
    const result = await get(pathUrl);
    return result.data;
  }

  const { page, pageSize } = filterData;
  let url = `${pathUrl}?`;

  if (page !== undefined && pageSize !== undefined) {
    url += `page=${page}&limit=${pageSize}&`;
  }

  const result = await get(url);
  return result.data;
};

export const updateUser = async (data: any) => {
  const { id, ...orther } = data;
  const result = await put(`${pathUrl}${id}`, orther);
  return result.data;
};

export const getUserById = async (id: string) => {
  const result = await get(`${pathUrl}${id}`);
  return result.data;
};
