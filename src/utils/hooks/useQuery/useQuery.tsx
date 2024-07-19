import { getRetry } from '@/utils/helpers/getRetry';
import { DependencyList, useEffect, useRef, useState } from 'react';
import { useMount } from '../useMount/useMount';
import { useDidUpdate } from '../useDidUpdate/useDidUpdate';

/* тип для объекта с опциями для хука useQuery */
export interface UseQueryOptions<QueryData, Data> {
  /* массив зависимостей, при изменении которых будет вызываться перерендеринг хука */
  keys?: DependencyList;
  /* callback вызываемый при успешном завершении запроса */
  onSuccess?: (data: Data) => void;
  /* callback вызываемый при ошибке */
  onError?: (data: Error) => void;
  /* callback для дополниельной обработки при успешном завершении запроса непосредственно перед onSuccess */
  select?: (data: QueryData) => Data;
  /* начальные данные для хука */
  initialData?: Data | (() => Data);
  /* данные для хука в случае ошибки */
  placeholderData?: Data | (() => Data);
  /* количество повторных попыток запроса */
  retry?: boolean;
  /* интервал через который выполнять повторные запросы */
  refetchInterval?: number;
  // ?
  /* The enabled state of the query */
  enabled?: boolean;
}

/* тип возвращаемого значения useQuery */
export interface UseQueryReturn<Data> {
  data?: Data;

  isLoading: boolean;

  isError: boolean;

  isSuccess: boolean;

  error?: Error;

  refetch: (params?: any) => void;

  isRefetching: boolean;
}

export const useQuery = <QueryData, Data = QueryData>(
  callback: (params?: any) => Promise<QueryData>,
  options?: UseQueryOptions<QueryData, Data>
): UseQueryReturn<Data> => {
  const enabled = options?.enabled ?? true;
  const retryCountRef = useRef(options?.retry ? getRetry(options.retry) : 0);

  const [data, setData] = useState<Data | undefined>(options?.initialData);
  const [error, setError] = useState<Error | undefined>(undefined);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [isSuccess, setIsSuccess] = useState(!!options?.initialData);

  const intervalIdRef = useRef<ReturnType<typeof setInterval>>();

  const request = (action: 'init' | 'refetch', params?: any) => {
    setIsLoading(true);
    if (action === 'refetch') setIsRefetching(true);
    console.log('action: ', action, '; params: ', params)
    callback(params)
      .then((response) => {
        const data = options?.select ? options?.select(response) : response;
        options?.onSuccess?.(data as Data);
        setData(data as Data);
        setIsSuccess(true);
        setIsLoading(false);
        setError(undefined);
        setIsError(false);
        if (action === 'refetch') setIsRefetching(false);
        retryCountRef.current = options?.retry ? getRetry(options.retry) : 0;
      })
      .catch((error: Error) => {
        if (retryCountRef.current > 0) {
          retryCountRef.current -= 1;
          return request(action, params);
        }
        options?.onError?.(error);
        setData(undefined);
        setIsSuccess(false);
        setIsLoading(false);
        setError(error);
        setIsError(true);
        if (action === 'refetch') setIsRefetching(false);
        retryCountRef.current = options?.retry ? getRetry(options.retry) : 0;
      })
      .finally(() => {
        if (options?.refetchInterval) {
          const interval = setInterval(() => {
            clearInterval(interval);
            request('refetch', params);
          }, options?.refetchInterval);
          intervalIdRef.current = interval;
        }
      });
  };

  useMount(() => {
    if (!enabled) return;
    request('init');
  });

  useDidUpdate(() => {
    if (!enabled) return;
    request('refetch');
  }, [enabled, ...(options?.keys ?? [])]);

  useEffect(() => {
    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [enabled, options?.refetchInterval, options?.retry, ...(options?.keys ?? [])]);

  const refetch = (params?: any) => request('refetch', params);

  const placeholderData =
    options?.placeholderData instanceof Function
      ? options?.placeholderData()
      : options?.placeholderData;

  return {
    data: data ?? placeholderData,
    error,
    refetch,
    isLoading,
    isError,
    isSuccess,
    isRefetching
  };
};
