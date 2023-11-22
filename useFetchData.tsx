import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

type Params = {
  [key: string]: unknown;
};

type Props<ReturnDataType> = {
  queryKey: QueryKey;
  url: string;
  params?: Params;
  axiosConfig?: AxiosRequestConfig<ReturnDataType>;
  reactQueryOptions?: Omit<
    UseQueryOptions<ReturnDataType, AxiosError>,
    'queryKey' | 'queryFn'
  >;
};

/**
 * Custom hook for fetching data using axios and react-query.
 *
 * @template ReturnDataType - The type of data returned by the API.
 * @param {Props<ReturnDataType>} props - The hook props.
 * @returns {QueryResult<ReturnDataType>} - The react-query query result.
 */
function useFetchData<ReturnDataType>({
  queryKey,
  url,
  params,
  axiosConfig,
  reactQueryOptions,
}: Props<ReturnDataType>) {

  return useQuery({
    queryKey,
    queryFn: async () => {
      const { data } = await axios.get<ReturnDataType>(url, {
        params,
        ...axiosConfig,
      });
      return data;
    },
    ...reactQueryOptions,
  });
}

export default useFetchData;
