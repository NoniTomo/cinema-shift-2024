import { SignInDto } from '@/utils/types';
import { api } from '@/utils/api/instance';

export type GetUserConfig = AxiosRequestConfig;

export const getSession = async (configRequest: AxiosRequestConfig<SignInDto>) => {
  return api.post('/users/session', configRequest);
};
