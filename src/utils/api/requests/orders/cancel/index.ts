import { api } from "@/utils/api/instance"

export type PutCancelOrderParams = { orderId: string };
export type PutCancelOrderConfig = AxiosRequestConfig<PutCancelOrderParams>;

export const putCancelOrder = async ({ params, config }: PutCancelOrderConfig) => {
  return api.put<Response>('/cinema/orders/cancel', params, config);
}