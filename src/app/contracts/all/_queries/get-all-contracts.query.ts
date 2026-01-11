import api from '@/common/api';
import { URL } from '@/common/api-base-urls';
import { GetAllContractsResponse } from '@/common/types/interfaces/contracts/contract';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useGetAllContracts = (
  limit: number,
  page: number,
  start_date?: string,
  end_date?: string,
  search?: string | null,
): UseQueryResult<GetAllContractsResponse, AxiosError<{ message: string }>> => {
  const getContracts = async (): Promise<GetAllContractsResponse> => {
    const response = await api.get(URL.GET_CONTRACTS, {
      params: {
        limit,
        start_date,
        end_date,
        search,
        page,
      },
    });
    return response.data;
  };
  return useQuery({
    queryFn: getContracts,
    queryKey: ['contracts', limit, page, start_date, end_date, search],
  });
};
