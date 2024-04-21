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
  if (!filterDataApi) {
    const { data, isLoading } = useQuery(
      [QUERIES_KEYS.GET_ARTIST],
      () => getAllArtist(),
      {
        keepPreviousData: true,
        staleTime: 5 * 1000,
      },
    );
    return { data, isLoading };
  }

  const { page, pageSize } = filterDataApi;
  const queryClient = useQueryClient();

  if (page !== undefined && pageSize !== undefined) {
    const { page: currentPage, ...other } = filterDataApi;
    if (currentPage) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery(
        [QUERIES_KEYS.GET_ARTIST, { page: nextPage, ...other }],
        () => getAllArtist({ page: nextPage, ...other }),
      );
    }
  }

  const { data, isLoading } = useQuery(
    [QUERIES_KEYS.GET_ARTIST, filterDataApi],
    () => getAllArtist(filterDataApi),
    {
      keepPreviousData: true,
      staleTime: 5 * 1000,
    },
  );

  return { data, isLoading };
};
