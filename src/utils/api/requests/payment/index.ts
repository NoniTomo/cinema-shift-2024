import { api } from "@/utils/api/instance"

export type PostCinemaPaymentParam = CreateCinemaPaymentDto;
export type PostCinemaPaymentConfig = AxiosRequestConfig<PostCinemaPaymentParam>;

export const postPayment = async ({ params, config }: PostCinemaPaymentConfig) => {
  return api.post<PaymentResponse>('/cinema/payment', params, config);
}