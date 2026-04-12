import { useEffect, useState } from 'react';
import { AxiosRequestConfig, CanceledError } from 'axios';
import apiClient from '../services/api-client';

interface FetchResponse<T> {
  count: number;
  results: T[];
}

interface DataState<T> {
  data: T[];
  error: string;
  resolvedKey: string;
}

const useData = <T>(
  endpoint: string,
  requestConfig?: AxiosRequestConfig
) => {
  const requestKey = JSON.stringify({
    endpoint,
    params: requestConfig?.params ?? null,
  });
  const [state, setState] = useState<DataState<T>>({
    data: [],
    error: '',
    resolvedKey: '',
  });

  useEffect(() => {
    const controller = new AbortController();
    apiClient
      .get<FetchResponse<T>>(endpoint, {
        signal: controller.signal,
        ...requestConfig,
      })
      .then((res) => {
        setState({
          data: res.data.results,
          error: '',
          resolvedKey: requestKey,
        });
      })
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setState({
          data: [],
          error: error.message,
          resolvedKey: requestKey,
        });
      });

    return () => controller.abort();
  }, [endpoint, requestConfig, requestKey]);

  return {
    data: state.resolvedKey === requestKey ? state.data : [],
    error: state.resolvedKey === requestKey ? state.error : '',
    isLoading: state.resolvedKey !== requestKey,
  };
};

export default useData;
