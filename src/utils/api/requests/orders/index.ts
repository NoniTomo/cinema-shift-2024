import { api } from "@/utils/api/instance"

export type GetTodayConfig = AxiosRequestConfig;

export const getOrders = async (requestConfig: AxiosRequestConfig) => {
  return api.get<CinemaOrdersResponse>('/cinema/orders', requestConfig.config);
}