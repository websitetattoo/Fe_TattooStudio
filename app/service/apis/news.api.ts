import { filterData } from "@/app/types/type";
import { get, post, put, remove } from "@/lib/http";

const pathUrl = "/news/";

const configHeader = {
  headers: { "Content-Type": "multipart/form-data" },
};

export const getAllNews = async (filterData?: filterData) => {
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

export const getNewsById = async (id: string) => {
  const result = await get(`${pathUrl}${id}`);
  return result.data;
};

export const deleteNews = async (id: string) => {
  const result = await remove(`${pathUrl}${id}`);
  return result.data;
};

export const createNews = async (data: any) => {
  const { id, ...postData } = data;

  const result = await post(pathUrl, postData, configHeader);
  return result.data;
};

export const updateNews = async (data: any) => {
  const { id, ...orther } = data;
  const result = await put(`${pathUrl}${id}`, orther, configHeader);
  return result.data;
};
