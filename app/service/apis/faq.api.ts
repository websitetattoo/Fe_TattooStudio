import { filterFaqData } from "@/app/types/type";
import { get, post, put, remove } from "@/lib/http";

const pathUrl = "/Faq/";

export const getAllFaq = async (filterData?: filterFaqData) => {
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

export const getFaqById = async (id: string) => {
  const result = await get(`${pathUrl}${id}`);
  return result.data;
};

export const deleteFaq = async (id: string) => {
  const result = await remove(`${pathUrl}${id}`);
  return result.data;
};

export const createFaq = async (data: any) => {
  const { id, ...postData } = data;
  const result = await post(pathUrl, postData);
  return result.data;
};

export const updateFaq = async (data: any) => {
  const { id, ...orther } = data;
  const result = await put(`${pathUrl}${id}`, orther);
  return result.data;
};
