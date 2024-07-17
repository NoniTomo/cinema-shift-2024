import { api } from "@/utils/api/instance";

export type PostOtpParams = CreateOtpDto;
export type PostOtpConfig = AxiosRequestConfig<PostOtpParams>;

export const postOtp = async ({ params, config }: PostOtpConfig) => {
  return api.post<OtpResponse>('/auth/otp', params, config);
}