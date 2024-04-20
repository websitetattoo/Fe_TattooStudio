import { filterPolicesData } from "@/app/types/type";
import { get, post, put, remove } from "@/lib/http";

const pathUrl = "/tattoocare/";

export const getAllTattooCare = async (filterData?: filterPolicesData) => {
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

export const getTatooCareById = async (id: string) => {
  const result = await get(`${pathUrl}${id}`);
  return result.data;
};

export const deleteTattooCare = async (id: string) => {
  const result = await remove(`${pathUrl}${id}`);
  return result.data;
};

export const createTatooCare = async (data: any) => {
  const { id, ...postData } = data;
  const result = await post(pathUrl, postData);
  return result.data;
};

export const updateTattooCare = async (data: any) => {
  const { id, ...orther } = data;
  const result = await put(`${pathUrl}${id}`, orther);
  return result.data;
};
