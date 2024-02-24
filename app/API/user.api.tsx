import axios, { AxiosResponse } from "axios";

const postApi = axios.create({
  baseURL: "http://localhost:3000/users",
});

export const getAllUsers = (): Promise<AxiosResponse<any[]>> => {
  return postApi.get("/");
};

export const getUserById = (id: string): Promise<AxiosResponse<any>> => {
  return postApi.get(`/${id}`);
};
