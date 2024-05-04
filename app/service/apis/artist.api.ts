import { filterArtistData } from "@/app/types/type";
import { get, post, put, remove } from "@/lib/http";

const pathUrl = "/Artist/";

const configHeader = {
  headers: { "Content-Type": "multipart/form-data" },
};

export const getAllArtist = async (filterData?: filterArtistData) => {
  if (!filterData) {
    const result = await get(pathUrl);
    return result.data;
  }

  const { page, pageSize, fields } = filterData;
  let url = `${pathUrl}?`;

  if (page !== undefined && pageSize !== undefined) {
    url += `page=${page}&limit=${pageSize}&`;
  }

  if (fields !== undefined) {
    url += `fields=${fields}`;
  }

  const result = await get(url);
  return result.data;
};

export const getArtistById = async (id: string) => {
  const result = await get(`${pathUrl}${id}`);
  return result.data;
};

export const deleteArtist = async (id: string) => {
  const result = await remove(`${pathUrl}${id}`);
  return result.data;
};

export const createArtist = async (data: any) => {
  const result = await post(pathUrl, data, configHeader);
  return result.data;
};

export const updateArtist = async (data: any) => {
  const { id, ...orther } = data;
  const result = await put(`${pathUrl}${id}`, orther);
  return result.data;
};
