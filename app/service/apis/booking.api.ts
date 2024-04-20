import { filterBookingData } from "@/app/types/type";
import { get } from "@/lib/http";

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

export const getBookingById = async (id: string) => {
  const result = await get(`${pathUrl}${id}`);
  return result.data;
};
