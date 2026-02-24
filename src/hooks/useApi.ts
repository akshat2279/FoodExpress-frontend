/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';

interface UseApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

export const useApi = <T,>(
  apiFunction: (...args: any[]) => Promise<any>,
  args: any[] = [],
  dependencies: any[] = []
) => {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    isLoading: true,
    error: null,
  });

  const fetchData = async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const response = await apiFunction(...args);
      
      if (response.error) {
        setState({
          data: null,
          isLoading: false,
          error: response.error,
        });
      } else {
        setState({
          data: response.data?.data || response.data,
          isLoading: false,
          error: null,
        });
      }
    } catch (err: any) {
      setState({
        data: null,
        isLoading: false,
        error: err.message || 'An error occurred',
      });
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { ...state, refetch: fetchData };
};

export const useApiMutation = <T, D>(apiFunction: (data: D) => Promise<any>) => {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const mutate = async (data: D) => {
    setState({ data: null, isLoading: true, error: null });
    
    try {
      const response = await apiFunction(data);
      
      if (response.error) {
        setState({
          data: null,
          isLoading: false,
          error: response.error,
        });
        return null;
      } else {
        const resultData = response.data?.data || response.data;
        setState({
          data: resultData,
          isLoading: false,
          error: null,
        });
        return resultData;
      }
    } catch (err: any) {
      setState({
        data: null,
        isLoading: false,
        error: err.message || 'An error occurred',
      });
      return null;
    }
  };

  return { ...state, mutate };
};
