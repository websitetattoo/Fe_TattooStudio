import { filterBookingData } from "@/app/types/type";
import { get, post } from "@/lib/http";

const configHeader = {
  headers: { "Content-Type": "multipart/form-data" },
};

const pathUrl = "/Booking/";

export const getAllBooking = async (filterData?: filterBookingData) => {
  if (!filterData) {
    const result = await get(pathUrl);
    return result.data;
  }

  const { page, pageSize, arrType } = filterData;
  let url = `${pathUrl}?`;

  if (page !== undefined && pageSize !== undefined) {
    url += `page=${page}&limit=${pageSize}&`;
  }

  if (arrType !== undefined && Object.keys(arrType).length > 0) {
    const { artist } = arrType;
    url += `populate=${artist}&`;
  }

  const result = await get(url);
  return result.data;
};

export const getBookingById = async (
  id: string,
  filterData?: filterBookingData,
) => {
  if (!filterData) {
    const result = await get(`${pathUrl}${id}`);
    return result.data;
  }

  const { arrType } = filterData;
  let url = `${pathUrl}${id}?`;

  if (arrType !== undefined && Object.keys(arrType).length > 0) {
    const { artist } = arrType;
    url += `populate=${artist}`;
  }
  const result = await get(`${url}`);
  return result.data;
};

export const createBooking = async (data: any) => {
  console.log("form1:", data);
  const result = await post(pathUrl, data, configHeader);
  return result.data;
};
