/* eslint-disable @typescript-eslint/no-explicit-any */
import type ApiResponse from '../resources/IApiResponse';

export interface IUseInfiniteScrollParamsLatest<P> {
  apiService: (params: P) => Promise<ApiResponse>;
  limit?: number;
  apiParams: Partial<P>;
}

export interface IUseInfiniteScrollReturnLatest<D> {
  data: D[];
  hasMore: boolean;
  loading: boolean;
  apiResponse?: ApiResponse;
  setData: React.Dispatch<React.SetStateAction<D[]>>;
  loadMore: () => void;
  fetchData: (firstLoad?: boolean, otherParams?: { [key: string]: unknown }) => Promise<void>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
