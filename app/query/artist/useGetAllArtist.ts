"use client";
// Libraries
import { useQuery, useQueryClient } from "react-query";
// Constants
import { QUERIES_KEYS } from "@/constants/queries";
// Services
import { getAllArtist } from "@/app/service/apis/artist.api";
//Types
import { filterArtistData } from "@/app/types/type";

export const useGetDataArtist = (filterDataApi?: filterArtistData) => {
  const queryClient = useQueryClient();

  if (filterDataApi) {
    const { page, pageSize, ...other } = filterDataApi;

    if (page !== undefined && pageSize !== undefined) {
      const nextPage = page + 1;
      queryClient.prefetchQuery(
        [QUERIES_KEYS.GET_ARTIST, { page: nextPage, ...other }],
        () => getAllArtist({ page: nextPage, ...other }),
      );
    }

    return useQuery(
      [QUERIES_KEYS.GET_ARTIST, filterDataApi],
      () => getAllArtist(filterDataApi),
      {
        keepPreviousData: true,
        staleTime: 5 * 1000,
      },
    );
  }

  return useQuery([QUERIES_KEYS.GET_ARTIST], () => getAllArtist(), {
    keepPreviousData: true,
    staleTime: 5 * 10000,
  });
};
